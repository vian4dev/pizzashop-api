import { Elysia, t } from 'elysia'
import { registerRestaurant } from './routes/register-restaurant'
import { authLinks } from '../db/schema'
import { sendAuthlink } from './routes/send-auth-link'

const app = new Elysia()
  .use(registerRestaurant)
  .use(sendAuthlink)

app.listen(3333, () => {
  console.log('🔥 HTTP server running')
})
