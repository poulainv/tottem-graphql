import { Photon } from '@generated/photon'
import { ICollection } from '../src/data/types'
import { getSections } from '../src/data/utils'
import logger from '../src/logging'

const profiles = [
    'awesome-css-learning',
    'francois',
    'vincent',
    'humanetech',
    'awesome-prisma',
    'awesome-nextjs',
    'pcinephile',
    'filgo',
    'thinkerview',
]
const photon = new Photon()

// TODO Make nullable value optionnable rather than || ''!
async function main() {
    for (const profileName of profiles) {
        const profile = require(`../src/data/${profileName}/profile`).default
        const sections = getSections(profileName)
        logger.info(`Create : ${profile.slug} profile`)
        const user = await photon.users.create({
            data: {
                firstname: profile.firstname,
                slug: profile.slug,
                authUserId: profile.authUserId,
                biography: profile.biography,
                pictureUrl: profile.pictureUrl,
                label: profile.label,
                linkedin: profile.social && profile.social.linkedin,
                youtube: profile.social && profile.social.youtube,
                mail: profile.social && profile.social.mail,
                website: profile.social && profile.social.website,
            },
        })

        for (const section of sections) {
            logger.info(
                `Create : ${profile.slug}' collection ${section.name} items`
            )
            await photon.sections.create({
                data: {
                    slug: section.id,
                    name: section.name,
                    index: section.index,
                    owner: {
                        connect: {
                            id: user.id,
                        },
                    },
                    collections: {
                        create: section.collections.map(
                            (collection: ICollection) => {
                                return {
                                    slug: collection.id,
                                    name: collection.name,
                                    detail: collection.detail,
                                    createdAt: collection.date, // FIXME override does work
                                    owner: {
                                        connect: {
                                            id: user.id,
                                        },
                                    },
                                    items: {
                                        create:
                                            collection.items &&
                                            collection.items.map(x => {
                                                return {
                                                    title: x.title,
                                                    author: x.author,
                                                    type: x.type,
                                                    productUrl: x.productUrl,
                                                    imageUrl: x.imageUrl,
                                                    description: x.note,
                                                    meta:
                                                        x.meta !== undefined
                                                            ? JSON.stringify(
                                                                  x.meta
                                                              )
                                                            : undefined,
                                                }
                                            }),
                                    },
                                }
                            }
                        ),
                    },
                },
            })
        }
    }
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await photon.disconnect()
    })
