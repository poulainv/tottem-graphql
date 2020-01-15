import { SectionCreateManyWithoutSectionsInput } from '@prisma/photon'
import cuid = require('cuid')
import slugify from 'slugify'

const initialSections = [
    {
        name: 'Reading',
        collections: [
            {
                name: '😍 Must read content',
            },
            {
                name: '🌍 Favorite non fiction books',
            },
        ],
    },
    {
        name: 'Music',
        collections: [
            {
                name: '🎷 Album on repeat',
            },
            {
                name: '🧘‍♂️ Relaxing music',
            },
        ],
    },
]

export const getInitialSections: (
    userId: string
) => SectionCreateManyWithoutSectionsInput = userId => {
    return {
        create: initialSections.map(x => {
            const cuidSection = cuid()
            return {
                id: cuidSection,
                slug: `${slugify(x.name)}-${cuidSection}`,
                name: x.name,
                collections: {
                    create: x.collections.map(y => {
                        const cuidCollection = cuid()
                        return {
                            id: cuidCollection,
                            slug: `${slugify(y.name)}-${cuidCollection}`,
                            name: y.name,
                            owner: {
                                connect: {
                                    authUserId: userId,
                                },
                            },
                        }
                    }),
                },
            }
        }),
    }
}
