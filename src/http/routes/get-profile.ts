import Elysia from 'elysia'
import { auth } from '../auth'
import { db } from '../../db/connection'

export const getProfile = new Elysia()
.use(auth)
.get('/me', async ({ getCurrent }) => {
    const {userId} = await getCurrent()

    const user = await db.query.users.findFirst({
        where(fields, { eq }) {
            return eq(fields.id, userId)
        },
    })

    if (!user) {
        throw new Error('User not found.')
    }

    return user
})