import { queryType, stringArg } from 'nexus'
import { Context } from '../context'
import { GoogleBookSearch, MovieDBSearch } from '../parsers/searchers'


export const Query = queryType({
    definition(t) {
        t.crud.user()
        t.crud.collection()
        t.crud.section()
        t.crud.items({
            filtering: { collection: true, isArchived: true },
            ordering: { position: true },
        })
        t.crud.sections({ filtering: { owner: true, isDeleted: true } })
        t.crud.collections({
            ordering: { createdAt: true },
            filtering: { owner: true, section: true, isDeleted: true },
            pagination: true,
        })
        t.field('inbox', {
            type: 'Item',
            list: true,
            async resolve(_, {}, ctx: Context) {
                const user = await ctx.user
                const userInbox = await ctx.photon.users.findOne({
                    where: { authUserId: user?.auth0Id },
                    select: { inboxedItems: true },
                })

                if (userInbox?.inboxedItems === undefined) {
                    return Promise.reject(`Inbox ${user?.auth0Id} not found`)
                }
                return userInbox?.inboxedItems
            },
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