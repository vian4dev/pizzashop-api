import { Elysia, t } from 'elysia'
import { registerRestaurant } from './routes/register-restaurant'
import { sendAuthlink } from './routes/send-auth-link'
import { authenticateFromLink } from './routes/authenticated-from-link'
import { signOut } from './routes/sign-out'
import { getProfile } from './routes/get-profile'

const app = new Elysia()
  .use(registerRestaurant)
  .use(sendAuthlink)
  .use(authenticateFromLink)
  .use(signOut)
  .use(getProfile)

app.listen(3333, () => {
  console.log('🔥 HTTP server running')
})
