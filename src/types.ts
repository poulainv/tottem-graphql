import {
    arg,
    enumType,
    mutationType,
    objectType,
    queryType,
    stringArg,
} from 'nexus'
import { Context } from './context'
import { inferNewItemFromUrl } from './parsers'

export const Mutation = mutationType({
    definition(t) {
        t.crud.createOneSection()
        t.crud.createOneUser()
        t.crud.createOneCollection()
        t.crud.updateOneCollection()
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
        t.crud.items({ filtering: { collection: true } })
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
        t.model.items()
        t.model.owner()
        t.model.section()
    },
})

export const Item = objectType({
    name: 'Item',
    definition(t) {
        t.model.id()
        t.model.author()
        t.model.title()
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
