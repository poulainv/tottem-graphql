import jwt from 'jsonwebtoken'
import jwksClient from 'jwks-rsa'
import logger from '../logging'

const client = jwksClient({
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
})

function getKey(header: any, cb: any) {
    client.getSigningKey(header.kid, (err: any, key: any) => {
        const signingKey = key.publicKey || key.rsaPublicKey
        cb(null, signingKey)
    })
}

const options = {
    audience: process.env.AUTH0_AUDIENCE,
    issuer: `https://${process.env.AUTH0_DOMAIN}/`,
    algorithms: ['RS256'],
}

interface Auth0AccessToken {
    sub: string
}

export const verifyIdentity: (token?: string) => Promise<string> = async (
    token?: string
) => {
    if (token === undefined) {
        return Promise.reject()
    }
    return new Promise((resolve, reject) => {
        try {
            jwt.verify(token, getKey, options, (err, decoded) => {
                if (err || typeof decoded === 'string') {
                    logger.debug('Authorization headers not found')
                    return resolve(undefined)
                }
                const access = decoded as Auth0AccessToken
                const userId = access.sub
                logger.info(`User authenticated: ${userId}`)
                resolve(userId)
            })
        } catch (err) {
            reject(err)
        }
    })
}
