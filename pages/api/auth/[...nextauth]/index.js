
import  prisma  from '../../../../utils/prisma'
import { compare } from 'bcrypt'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
export const authOptions = {


  theme: {
    colorScheme: "light", // "auto" | "dark" | "light"
    brandColor: "#FF0104", // Hex color code
    logo: "https://www.freelogodesign.org/assets/img/logo-couleurs.jpeg", // Absolute URL to image
    buttonText: "#FF0000" // Hex color code
  },
  session: {
    strategy: 'jwt'
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      },
  ),
  GithubProvider({
    clientId: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET
  }),

    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'hello@example.com'
        },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null
        }

        // let user = await fetch(`http://localhost:3001/api/user/${credentials.password}`)
   
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        })
        
        if (!user) {
          return null
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.password
        )

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id + '',
          email: user.email,
          name: user.name,
          randomKey: 'Hey cool'
        }
      }
    })
  ],
  secret: process.env.SECRET,

  callbacks: {
    session: ({ session, token }) => {
      console.log('Session Callback', { session, token })
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          randomKey: token.randomKey
        }
      }
    },
    jwt: ({ token, user }) => {
      // console.log('JWT Callback', { token, user })
      if (user) {
        const u = user 
        return {
          ...token,
          id: u.id,
          randomKey: u.randomKey
        }
      }
      return token
    }
  }
}

export default NextAuth(authOptions)
