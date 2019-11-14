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

export interface UserAuth0 {
    sub: string // auth0 userId
    permissions: string[]
}

export const verifyIdentity: (token?: string) => Promise<UserAuth0> = async (
    token?: string
) => {
    if (token === undefined) {
        return Promise.reject()
    }
    return new Promise((resolve, reject) => {
        try {
            jwt.verify(token, getKey, options, (err, decoded) => {
                if (err) {
                    return reject(`Authorization headers not decoded ${err}`)
                } else if (typeof decoded === 'string') {
                    return reject(
                        `Authorization headers decoded as string ${decoded}`
                    )
                }
                const userAuth0 = decoded as UserAuth0
                logger.info(`User authenticated: ${userAuth0.sub}`)
                resolve(userAuth0)
            })
        } catch (err) {
            reject(err)
        }
    })
}
