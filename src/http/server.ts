import { Elysia, t } from 'elysia'
import { registerRestaurant } from './routes/register-restaurant'
import { sendAuthlink } from './routes/send-auth-link'
import jwt from '@elysiajs/jwt'
import { env } from '../env'
import cookie from '@elysiajs/cookie'

const app = new Elysia()
  .use(jwt({
    secret: env.JWT_SECRET_KEY,
    schema: t.Object({
      sub: t.String(),
      restaurant: t.Optional(t.String()),
    }),
  }))
  .use(cookie())
  .use(registerRestaurant)
  .use(sendAuthlink)

app.listen(3333, () => {
  console.log('🔥 HTTP server running')
})
