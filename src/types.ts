import {
    enumType,
    mutationType,
    objectType,
    queryType,
    stringArg,
    intArg,
    idArg,
} from 'nexus'
import { Context } from './context'
import { inferNewItemFromUrl } from './parsers'

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
        t.crud.createOneSection()
        t.crud.createOneUser()
        t.crud.updateOneItem()
        t.crud.createOneCollection()
        t.crud.updateOneCollection()
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
                const items = await ctx.photon.items.findMany({
                    where: {
                        collection: { id: collectionId },
                        isArchived: false,
                    },
                    select: { id: true, position: true },
                    orderBy: { position: 'asc' },
                })
                const newIndexedItems = reAssignPosition(
                    items,
                    oldIndex,
                    newIndex
                )
                const updates: Array<Promise<any>> = []
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
                        OR: items.map(x => {
                            return {
                                id: x.id,
                            }
                        }),
                    },
                })
            },
        })
        t.field('createItem', {
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
                            meta: item.meta && JSON.stringify(item.meta),
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
        t.crud.items({ filtering: { collection: true, isArchived: true } })
        t.crud.sections({ filtering: { owner: true } })
        t.crud.collections({
            ordering: { createdAt: true },
            filtering: { owner: true, section: true },
            pagination: true,
        })
    },
})

export const User = objectType({
    name: 'User',
    definition(t) {
        t.model.id()
        t.model.slug()
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
        t.model.collections()
    },
})

export const Collection = objectType({
    name: 'Collection',
    definition(t) {
        t.model.id()
        t.model.slug()
        t.model.name()
        t.model.createdAt()
        t.model.detail()
        t.model.items({ filtering: { isArchived: true } })
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
