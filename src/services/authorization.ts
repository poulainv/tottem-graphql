import { and, or, rule, shield } from 'graphql-shield'
import util from 'util'
import { Context } from '../context'
import logger from '../logging'

type Model = 'collection' | 'section'

// Rules
const isAuthenticated = rule({ cache: 'contextual' })(
    async (parent, args, ctx: Context, info) => {
        const userAuth = await ctx.user
        logger.debug(`Authenticated user:${util.inspect(userAuth)}`)
        return userAuth !== null && userAuth !== undefined
    }
)

const isAdmin = rule({ cache: 'contextual' })(
    async (parent, args, ctx: Context, info) => {
        const userAuth = await ctx.user
        return userAuth?.roles.includes('admin') ?? false
    }
)

const isCollectionOwner = rule({ cache: 'strict' })(
    async (parent, args, ctx, info) => {
        return isUserOwner(ctx, 'collection', args.where.id)
    }
)

const canCreateInCollection = rule({ cache: 'strict' })(
    async (parent, args, ctx, info) => {
        return isUserOwner(ctx, 'collection', args.collectionId)
    }
)

const isSectionOwner = rule({ cache: 'strict' })(
    async (parent, args, ctx, info) => {
        return isUserOwner(ctx, 'section', args.data.section.connect.id)
    }
)

// Permissions
const permissions = shield({
    Mutation: {
        createItem: and(isAuthenticated, or(isAdmin, canCreateInCollection)),
        createOneCollection: and(isAuthenticated, or(isAdmin, isSectionOwner)),
        updateOneCollection: and(
            isAuthenticated,
            or(isAdmin, isCollectionOwner)
        ),
    },
})

const getOwnerAuth0id: (
    ctx: Context,
    type: Model,
    id: string
) => Promise<string | undefined | null> = async (ctx, type, id) => {
    if (type === 'collection') {
        // Only member check object to update owner
        const collection = await ctx.photon.collections.findOne({
            where: {
                id,
            },
            select: {
                owner: { select: { authUserId: true } },
            },
        })
        return collection?.owner.authUserId
    } else if (type === 'section') {
        const section = await ctx.photon.sections.findOne({
            where: {
                id,
            },
            select: {
                owner: { select: { authUserId: true } },
            },
        })
        return section?.owner.authUserId
    }
    throw new Error('Not implemented')
}

const isUserOwner: (
    ctx: Context,
    type: Model,
    id: string
) => Promise<boolean> = async (ctx, type, id) => {
    const authUser = await ctx.user
    const ownerAuth0id = await getOwnerAuth0id(ctx, type, id)
    if (ownerAuth0id !== authUser?.auth0Id) {
        logger.info(
            `User:${authUser?.auth0Id} is not owner of ${type}:${id} owned by User:${ownerAuth0id}`
        )
        return Promise.reject(false)
    } else {
        logger.info(`User:${authUser?.auth0Id} is owner of ${type}:${id}`)
        return Promise.resolve(true)
    }
}

export { permissions, isUserOwner }

