import {
    enumType,
    idArg,
    intArg,
    mutationType,
    objectType,
    queryType,
    stringArg,
} from 'nexus'
import { Context } from './context'
import { createNewItemFromSearch, inferNewItemFromUrl } from './parsers'
import { GoogleBookSearch, MovieDBSearch } from './parsers/searchers'
import cuid from 'cuid'

interface Positonnable {
    position: number
}

export function reAssignPosition<T extends Positonnable>(
    array: T[],
    startIndex: number,
    endIndex: number
) {
    const result = Array.from(array)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result.flatMap((x, index) => {
        if (index === x.position) {
            return []
        } else {
            return {
                ...x,
                position: index,
            }
        }
    })
}

export const Mutation = mutationType({
    definition(t) {
        t.crud.updateOneSection()
        t.crud.createOneUser()
        t.crud.updateOneItem()
        t.crud.updateOneCollection()
        t.field('createEmptyCollection', {
            type: 'Collection',
            args: {
                sectionId: idArg({ required: true }),
            },
            async resolve(_, { sectionId }, ctx: Context) {
                const user = await ctx.user
                if (user === undefined) {
                    return Promise.reject('User not authenticated')
                }
                const id = cuid()
                return ctx.photon.collections.create({
                    data: {
                        id,
                        owner: {
                            connect: {
                                authUserId: user.auth0Id,
                            },
                        },
                        section: {
                            connect: {
                                id: sectionId,
                            },
                        },
                        slug: `new-collection-${id}`,
                    },
                })
            },
        })
        t.field('createEmptySection', {
            type: 'Section',
            async resolve(_, __, ctx: Context) {
                const user = await ctx.user
                if (user === undefined) {
                    return Promise.reject('User not authenticated')
                }
                const sections = await ctx.photon.sections.findMany({
                    where: { AND: { owner: { authUserId: user.auth0Id } } },
                })
                const id = cuid()
                return ctx.photon.sections.create({
                    data: {
                        id,
                        owner: {
                            connect: {
                                authUserId: user.auth0Id,
                            },
                        },
                        slug: `new-space-${id}`,
                        index: sections.length,
                    },
                })
            },
        })
        t.field('changeItemPosition', {
            type: 'Item',
            list: true,
            description: `Mutation changing the position of an item from his $oldIndex to the $newIndex.
            It takes *indexes* (not position) and return changed items with new position.
            `,
            args: {
                collectionId: idArg({ required: true }),
                oldIndex: intArg({ required: true }),
                newIndex: intArg({ required: true }),
            },
            async resolve(
                _,
                { oldIndex, newIndex, collectionId },
                ctx: Context
            ) {
                const items = (
                    await ctx.photon.items.findMany({
                        where: {
                            collection: { id: collectionId },
                            isArchived: false,
                        },
                        select: { id: true, position: true },
                        // this order is related to items order on the page
                        // Should be nested order not supported by photon yet FIXME
                        orderBy: { createdAt: 'desc' },
                    })
                ).sort((a, b) => a.position - b.position) // FIXME here!

                const newIndexedItems = reAssignPosition(
                    items,
                    oldIndex,
                    newIndex
                )
                const updates: Array<Promise<any>> = [] // FIXME any!
                for (const item of newIndexedItems) {
                    updates.push(
                        ctx.photon.items.update({
                            data: {
                                position: item.position,
                            },
                            where: { id: item.id },
                        })
                    )
                }
                await Promise.all(updates)
                return ctx.photon.items.findMany({
                    where: {
                        OR: newIndexedItems.map(x => {
                            return {
                                id: x.id,
                            }
                        }),
                    },
                })
            },
        })
        t.field('createItemFromSearch', {
            type: 'Item',
            args: {
                id: stringArg({ required: true }),
                kind: stringArg({ required: true }),
                collectionId: stringArg({ required: true }),
            },
            async resolve(_, { id, kind, collectionId }, ctx: Context) {
                return createNewItemFromSearch(id, kind).then(item => {
                    return ctx.photon.items.create({
                        data: {
                            title: item.title,
                            author: item.author,
                            type: item.type,
                            meta: item.meta && JSON.stringify(item.meta), // FIXME JSON fields not supported yet
                            provider: item.provider,
                            productUrl: item.productUrl,
                            imageUrl: item.imageUrl,
                            collection: {
                                connect: {
                                    id: collectionId,
                                },
                            },
                        },
                    })
                })
            },
        })
        t.field('createItemFromUrl', {
            type: 'Item',
            args: {
                url: stringArg({ required: true }),
                collectionId: stringArg({ required: true }),
            },
            async resolve(_, { url, collectionId }, ctx: Context) {
                return inferNewItemFromUrl(url).then(item => {
                    return ctx.photon.items.create({
                        data: {
                            title: item.title,
                            author: item.author,
                            type: item.type,
                            meta: item.meta && JSON.stringify(item.meta), // FIXME JSON fields not supported yet
                            provider: item.provider,
                            productUrl: item.productUrl,
                            imageUrl: item.imageUrl,
                            collection: {
                                connect: {
                                    id: collectionId,
                                },
                            },
                        },
                    })
                })
            },
        })
    },
})

export const Query = queryType({
    definition(t) {
        t.crud.user()
        t.crud.collection()
        t.crud.section()
        t.crud.items({
            filtering: { collection: true, isArchived: true },
            ordering: { position: true },
        })
        t.crud.sections({ filtering: { owner: true, isDeleted: true} })
        t.crud.collections({
            ordering: { createdAt: true },
            filtering: { owner: true, section: true, isDeleted: true },
            pagination: true,
        })
        t.field('search', {
            type: 'SearchItem',
            args: {
                q: stringArg({ required: true }),
                kind: stringArg({ required: true }),
            },
            list: true,
            async resolve(_, { q, kind }, ctx: Context) {
                if (kind === 'movie') {
                    const res = await MovieDBSearch(q, undefined, 'fr')
                    return res.map(x => {
                        return {
                            id: x.id,
                            title: x.title,
                            author: '',
                            type: 'movie',
                        }
                    })
                } else if (kind === 'book') {
                    const res = await GoogleBookSearch(q)
                    return res.items.map(x => {
                        return {
                            id: x.id,
                            title: x.volumeInfo.title,
                            author:
                                x.volumeInfo.authors && x.volumeInfo.authors[0],
                            type: 'book',
                        }
                    })
                }
                return Promise.reject(`Kind ${kind} not supported`)
            },
        })
    },
})

export const User = objectType({
    name: 'User',
    definition(t) {
        t.model.id()
        t.model.slug()
        t.model.authUserId()
        t.model.biography()
        t.model.pictureUrl()
        t.model.label()
        t.model.firstname()
        t.model.sections()
        t.model.website()
        t.model.linkedin()
        t.model.youtube()
        t.model.mail()
        t.model.github()
    },
})

export const Section = objectType({
    name: 'Section',
    definition(t) {
        t.model.id()
        t.model.slug()
        t.model.index()
        t.model.name()
        t.model.collections({ filtering: { isDeleted: true } })
        t.model.isExpanded()
    },
})

export const Collection = objectType({
    name: 'Collection',
    definition(t) {
        t.model.id()
        t.model.slug()
        t.model.name()
        t.model.createdAt()
        t.model.isDeleted()
        t.model.detail()
        t.model.items({
            filtering: { isArchived: true },
            ordering: { position: true },
        })
        t.model.owner()
        t.model.section()
    },
})

export const Item = objectType({
    name: 'Item',
    definition(t) {
        t.model.id()
        t.model.author()
        t.model.isArchived()
        t.model.title()
        t.model.position()
        t.model.imageUrl()
        t.model.productUrl()
        t.model.description()
        t.model.provider()
        t.model.comment()
        t.model.type()
        t.model.meta()
        t.model.createdAt()
    },
})

export const SearchItem = objectType({
    name: 'SearchItem',
    definition(t) {
        t.string('id')
        t.string('title')
        t.string('author', { nullable: true })
        t.string('type')
    },
})

export const ItemType = enumType({
    name: 'ItemType',
    members: [
        'book',
        'album',
        'movie',
        'people',
        'video',
        'article',
        'podcast',
        'repository',
        'website',
    ],
})
