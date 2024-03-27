import type { Metadata } from "next";
import Head from "next/head";
import Header from './components/Header'
import "./globals.css";
import StoreProvider from "./StoreProvider";
import { getUserGitHubId } from "./useractions";
import getUserData from "@/lib/user/fetchUserData";
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
  title: "Dcard Intern",
  description: "Generated by create next app",
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) 
{
  const isUserLogIn = await getUserGitHubId()
  
  if (!isUserLogIn) {
    return (
    <StoreProvider>
      <html lang="en">
        <body className='bg-bodycolor'>
          {children}
        </body>
      </html>
    </StoreProvider>
    )
  }
  const userInfo = await getUserGitHubId()
  let userID;
  let photo;
  if(userInfo) userID = userInfo.userId
  if(userInfo) photo = userInfo.userPhoto
  const data = await getUserData(userID)
  if (!data) {
    return (
      <html lang="en">
        <body className='bg-bodycolor'>
          <div className="text-white text-2xl">Loading...</div>
        </body>
      </html>
    )
  }
  return (
  <StoreProvider>
    <html lang="en">
        <Head>
          <meta name="google-site-verification" content="c_qStRKUBS9cJtGsE-N_VWnMerZoTiNAOyFpQcXWVJg" />
        </Head>
        <body className='bg-bodycolor'>
          <Header profileData={data} photo={photo}/>
          {children}
          <SpeedInsights />
        </body>
    </html>
  </StoreProvider>
  );
}
