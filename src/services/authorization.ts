import { Context } from '../context'
import { AuthenticationError, ForbiddenError } from 'apollo-server'
import logger from '../logging'

type Model = 'collection'

const isUserAuthAllowed: (
    ctx: Context,
    type: Model,
    id: string
) => Promise<boolean> = async (ctx, type, id) => {
    const authUser = await ctx.user
    // If not logged reject
    if (authUser === undefined) {
        throw new AuthenticationError('User not logged')
    }

    // If user is admin pass
    if (authUser.permissions.includes('admin')) {
        return Promise.resolve(true)
    }

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
        const ownerAuth0id = collection?.owner.authUserId
        if (ownerAuth0id !== authUser?.auth0Id) {
            throw new ForbiddenError('Not authorized')
        } else {
            logger.info(`Collection owner ${ownerAuth0id} authorized`)
            return Promise.resolve(true)
        }
    } else {
        throw new Error('Not implemented')
    }
}

export { isUserAuthAllowed }
