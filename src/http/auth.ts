import jwt from "@elysiajs/jwt";
import { Elysia, t, type Static } from "elysia";
import cookie from "@elysiajs/cookie";
import { env } from "../env";

const jwtPayload = t.Object({
  sub: t.String(),
  restaurantId: t.Optional(t.String()),
})

export const auth = new Elysia().use(
  jwt({
    secret: env.JWT_SECRET_KEY,
    schema: jwtPayload,
  }),
).use(cookie())
  .derive(({ jwt, removeCookie, setCookie }) => {
    return {
      signUser: async (payload: Static<typeof jwtPayload>) => {
        const token = await jwt.sign(payload)

        setCookie('auth', token, {
          httpOnly: true,
          maxAge: 60 * 60 * 24 * 7, // 7 days
          path: '/',
        })
      },

      signOut: async () => {
        removeCookie('auth')
      }
    }
  })