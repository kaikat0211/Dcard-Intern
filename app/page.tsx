'use client'
import React, { useEffect } from 'react'
import LoginButton from './components/LoginButton'
import { useRouter } from 'next/navigation'
import { useAppSelector } from '@/lib/hooks'

export default function Home() {
  const router = useRouter()
  const state = useAppSelector(state => state.user)
  useEffect(()=>{
    if(state) router.push('/issues')
  },[state])
  return (
  <>
    <LoginButton />
  </>
  )
}
