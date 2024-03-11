'use client'
import { useAppSelector } from '@/lib/hooks'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
const ChooseRepo = () => {
    const state = useAppSelector(state => state.user)
    const repos = Object.keys(state.repoInfo)
    const path = usePathname()
  return (
    <>
        <div className="w-full mt-20 flex justify-center">
            {repos.map(r => (
              <Link key={r} href={`${path}/${r}`} className="border-2 p-2 border-white  text-red-200">{r}</Link>
            ))}
        </div>
    </>
  )
}

export default ChooseRepo