'use client'
import React from 'react'
import Image from 'next/image'
import GitHubLogo from '../../public/GitHubLogo.png'
import GitHubMark from '../../public/GitHubMark.png'
import { signIn } from "next-auth/react";
const LoginButton = () => {
return (
    <div className='center mt-60'>
        <div className='border border-githubBorder bg-labelscolor rounded-lg flex flex-col items-center justify-center py-20 pl-5'>
            <div className='flex items-center gap-5'>
                <Image alt='mark' src={GitHubMark} width={100} height={100} />
                <Image alt='logo' src={GitHubLogo} width={300} height={100} />  
            </div>
            <button className='text-xl mt-10 border border-githubBorder text-white p-2 rounded-lg hover:bg-labelshover' onClick={() => signIn('github')}>Click to sign In</button>
        </div>
    </div>
    
  )
}

export default LoginButton