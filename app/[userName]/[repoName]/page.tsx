'use client'
import { useAppSelector } from '@/lib/hooks'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
const RepoName = ({ params } : { params: { repoName: string } }) => {
const path = usePathname()
const router = useRouter()
const state = useAppSelector(state => state.user)
const Validpathname = Object.keys(state.repoInfo)
useEffect(()=>{
  if(path.split('/')[2] && !Validpathname.includes(path.split('/')[2] as string)) {
    router.push('/404')
    console.log('push 404')
  }
},[path])
  return (
    <>
      <div className='text-white'>{params.repoName}</div>
    </>
  )
}

export default RepoName