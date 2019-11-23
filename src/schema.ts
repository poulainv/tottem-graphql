import { makeSchema } from 'nexus'
import { nexusPrismaPlugin } from 'nexus-prisma'
import { join } from 'path'
import * as types from './types'

export const schema = makeSchema({
    types: [types, ],
    plugins: [nexusPrismaPlugin()],
    typegenAutoConfig: {
        contextType: 'Context.Context',
        sources: [
            {
                source: '@generated/photon',
                alias: 'photon',
            },
            {
                source: require.resolve('./context'),
                alias: 'Context',
            },
        ],
    },
    outputs: {
        typegen: join(__dirname, '/nexus.ts'),
        schema: join(__dirname, '/schema.graphql'),
    },
})
