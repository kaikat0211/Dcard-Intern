import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider  from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
export const options: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
        name: "Credentials",
        credentials: {
            username: {
                label: "Username",
                type: "text",
                placeholder: "your username"
            },
            password: {
                label: "password",
                type: "password",
                placeholder: "your password"
            }
        },
        async authorize(credentials){
            const user = { id:'22', name:'kai', password: '123321abc' }

            if(credentials?.username === user.name && credentials?.password === user.password){
                return user
            } else{
                return null
            }
        }
    })
  ],
  
};