'use client'
import { useAppSelector } from '@/lib/hooks'
import Link from 'next/link'
import React from 'react'
const ChooseRepo = () => {
    const state = useAppSelector(state => state.user)
    const repos = Object.keys(state.repoInfo)


  return (
    <>
        <div className="w-full mt-20 flex justify-center">
            {repos.map(r => (
              <Link key={r} href={`/${r}`} className="border-2 p-2 border-white  text-red-200">{r}</Link>
            ))}
        </div>
    </>
  )
}

export default ChooseRepo