import {enumType, mutationType, objectType, queryType, stringArg} from 'nexus'
import {IItem} from './interfaces'
import {inferNewItemFromUrl} from './parsers'
import {Context} from './context'

export const Mutation = mutationType({
    definition(t) {
        t.crud.createOneSection()
        t.crud.createOneCollection()
        t.field('createItem', {
            type: 'Item',
            args: {
                url: stringArg({ required: true }),
                collectionId: stringArg({ required: true }),
                overridedTitle: stringArg(),
            },
            async resolve(_, { url, overridedTitle, collectionId }, ctx: Context) {
                return inferNewItemFromUrl(url).then((item: IItem) => {
                    return ctx.photon.items.create({
                        data: {
                            title: overridedTitle || item.title,
                            author: item.author,
                            type: item.type,
                            meta: item.meta && JSON.stringify(item.meta),
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
        }),
            t.field('createUser', {
                type: 'User',
                args: {
                    slug: stringArg({ required: true }),
                    auth0Id: stringArg({ required: true }),
                    pictureUrl: stringArg(),
                },
                async resolve(_, { slug, auth0Id, pictureUrl }, ctx: Context) {
                    const user = await ctx.photon.users.create({
                        data: {
                            firstname: '',
                            slug,
                            auth0Id,
                            biography: '',
                            pictureUrl: pictureUrl || '',
                            label: '',
                            profile: {
                                create: {
                                    linkedin: null,
                                    youtube: null,
                                    mail: null,
                                    website: null,
                                },
                            },
                        },
                    });
                    // we need an empty section as well
                    await ctx.photon.sections.create({
                        data: {
                            slug: 'first-section',
                            name: 'Your first section',
                            index: 0,
                            owner: {
                                connect: {
                                    id: user.id,
                                },
                            },
                            collections: {
                                create: [],
                            },
                        },
                    });
                    return user
                },
            })
    },
})

export const Query = queryType({
    definition(t) {
        t.crud.user()
        t.crud.collection()
        t.crud.section()
        t.crud.sections({ filtering: { owner: true } })
        t.crud.collections({
            ordering: { date: true },
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
        t.model.auth0Id()
        t.model.biography()
        t.model.profile()
        t.model.pictureUrl()
        t.model.label()
        t.model.firstname()
        t.model.sections()
    },
})

export const Profile = objectType({
    name: 'Profile',
    definition(t) {
        t.model.website()
        t.model.linkedin()
        t.model.youtube()
        t.model.mail()
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
        t.model.date()
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
        t.model.comment()
        t.model.type()
        t.model.meta()
    },
})

const ItemType = enumType({
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
    ],
})
