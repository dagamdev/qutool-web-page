import type { IronSessionOptions } from "iron-session";

export const sessionOptions: IronSessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD || 'QkemJqhkVA3M61QMNkbFs5q9UYesCi7Z',
  cookieName: "qutool-discord-oauth2",
  cookieOptions: {
    maxAge: 24*60*60000,
  },
};

// This is where we specify the typings of req.session.*
declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: string
    },
  }
}