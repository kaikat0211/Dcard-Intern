'use client'
import { useAppSelector } from '@/lib/hooks'
import { usePathname } from 'next/navigation'
import React from 'react'
const ChooseRepo = () => {
    const state = useAppSelector(state => state.user)
    const repos = Object.keys(state.repoInfo)
    const pathName = usePathname()
const chooseRepoFunc = (() => {
  
})
  return (
    <>
        <div className="w-full mt-20 flex justify-center">
            {repos.map(r => (
              <button className="border-2 p-2 border-white  text-red-200" >{r}</button>
            ))}
        </div>
    </>
  )
}

export default ChooseRepo