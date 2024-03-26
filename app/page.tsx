'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAppSelector } from '@/lib/hooks'

export default function Home() {
  const router = useRouter()
  const userName = useAppSelector(state => state.user.name)

  useEffect(() => {
    if (userName) {
      router.push(`/issues`)
    }
  }, [userName])

  return <></>
}
