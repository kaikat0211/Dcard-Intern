import React, { useEffect } from 'react'
import LoginButton from './components/LoginButton'
import { getUserGitHubId } from './useractions'
import HomePageRedirect from './components/HomePageRedirect'

export default async function Home() {
  const isUserLogIn = await getUserGitHubId()

  return (
  <>
    <HomePageRedirect isUserLogIn={isUserLogIn}/>
    {isUserLogIn !== false ? "" : <LoginButton /> }
  </>
  )
}
