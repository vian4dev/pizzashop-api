import { Elysia, t } from 'elysia'
import { registerRestaurant } from './routes/register-restaurant'
import { sendAuthlink } from './routes/send-auth-link'
import { authenticateFromLink } from './routes/authenticated-from-link'

const app = new Elysia()
  .use(registerRestaurant)
  .use(sendAuthlink)
  .use(authenticateFromLink)

app.listen(3333, () => {
  console.log('🔥 HTTP server running')
})
