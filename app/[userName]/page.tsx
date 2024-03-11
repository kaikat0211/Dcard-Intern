'use client'
import { useAppSelector } from '@/lib/hooks'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import ChooseRepo from '../components/ChooseRepo'
const RepoName = ({ params } : { params: { userName: string } }) => {
const path = usePathname()
const router = useRouter()
const state = useAppSelector(state => state.user)
  return (
    <>
      <ChooseRepo />
    </>
  )
}

export default RepoName