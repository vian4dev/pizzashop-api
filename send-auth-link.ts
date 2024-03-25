import { Elysia, t } from "elysia"
import { db } from "../../db/connection"
import { authLinks } from "../../db/schema"
import { createId } from "@paralleldrive/cuid2"
import { env } from "bun"


export const sendAuthlink = new Elysia().post(
    'autenthicated/', 
    async ({ body }) => {
    const { email } = body

    const userFromEmail = await db.query.users.findFirst({
        where(fields, { eq }) {
            return eq(fields.email, email)
        },
    })

    if (!userFromEmail) {
        throw new Error('User not found')
    }

    const authLinkCode = createId()

    await db.insert(authLinks).values({
        userId: userFromEmail.id,
        code: authLinkCode,
    })

    // enviar um email

    const authLink = new URL('/auth-links/authenticate', env.API_BASE_URL)
    
    authLink.searchParams.set('code', authLinkCode)
    authLink.searchParams.set('redirect', env.AUTH_REDIRECT_URL)
}, {
    body: t.Object({
        email: t.String({ format: 'email'}),
    }),
})