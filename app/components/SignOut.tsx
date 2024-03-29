'use client'
import { signOut } from 'next-auth/react'
import React from 'react'

const SignOut = ({ singOutRef } : { singOutRef : React.RefObject<HTMLDivElement>}) => {
    
  return (
    <>
        <div className='absolute bottom--2 right-0 border border-githubBorder text-xs w-[80px] p-2 mt-1 rounded-xl text-textgray hover:bg-labelscolor flex justify-center  cursor-pointer' >
            <div className='flex' ref={singOutRef} onClick={()=>signOut()}>Sign Out</div>
        </div>
    </>
  )
}

export default SignOut