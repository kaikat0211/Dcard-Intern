import {
    GetServerSidePropsContext,
    NextApiRequest,
    NextApiResponse,
} from 'next'
import { NextAuthOptions ,getServerSession} from 'next-auth';
// import CredentialsProvider  from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
const githubConfig = {
    clientId: process.env.GITHUB_ID as string,
    clientSecret: process.env.GITHUB_SECRET as string,
    authorization: {
        url: "https://github.com/login/oauth/authorize",
        params: { scope: "repo user" },  
    },
    
    
  }

 const options: NextAuthOptions = {
  providers: [
    GithubProvider (githubConfig),
    // CredentialsProvider({
    //     name: "Credentials",
    //     credentials: {
    //         username: {
    //             label: "Username",
    //             type: "text",
    //             placeholder: "your username"
    //         },
    //         password: {
    //             label: "password",
    //             type: "password",
    //             placeholder: "your password"
    //         }
    //     },
    //     async authorize(credentials){
    //         const user = { id:'22', name:'kai', password: '123321abc' }

    //         if(credentials?.username === user.name && credentials?.password === user.password){
    //             return user
    //         } else{
    //             return null
    //         }
    //     }
    // })
  ],
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    callbacks: {
        jwt: async ({ token, user, account }) => {
            if (account && account.access_token) {
                // set access_token to the token payload
                token.accessToken = account.access_token
            }

            return token
        },
        redirect: async ({ url, baseUrl }) => {
            return baseUrl
        },
        session: async ({ session, token, user }) => {
            // If we want to make the accessToken available in components, then we have to explicitly forward it here.
            return { ...session, token: token.accessToken }
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
  
};
function auth(  // <-- use this function to access the jwt from React components
    ...args:
        | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
        | [NextApiRequest, NextApiResponse]
        | []
) {
    return getServerSession(...args, options)
}

export { options, auth }