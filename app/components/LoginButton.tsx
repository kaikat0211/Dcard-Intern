'use client'
import React from 'react'
import Image from 'next/image'
import GitHubLogo from '../../public/GitHubLogo.png'
import GitHubMark from '../../public/GitHubMark.png'
import { signIn } from "next-auth/react";

const LoginButton = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className='border border-githubBorder bg-labelscolor rounded-lg p-8 max-w-md w-full text-center'>
        <div className='flex flex-col items-center justify-center'>
          <Image alt='GitHub Mark' src={GitHubMark} width={100} height={100} />
          <Image alt='GitHub Logo' src={GitHubLogo} width={300} height={100} />
        </div>
        <button 
          className='mt-8 px-4 py-2 bg-labelshover text-white rounded-lg border border-labelshover hover:bg-labels hover:border-githubBorder transition-colors'
          onClick={() => signIn('github')}
        >
          Sign In with GitHub
        </button>
      </div>
    </div>
  )
}

export default LoginButton
