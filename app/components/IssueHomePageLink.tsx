'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
const IssueHomePageLink = ({type} : {type: string}) => {
    const pathname = usePathname()
    const path = pathname.split('/')[2]
    const compareType = type.toLowerCase() 
    // 
    const router = (type: string) => {
        switch(type){
            case 'Created' :
                return 'http://localhost:3000/issues'
            case 'Assigned' :
                return 'http://localhost:3000/issues/assigned'
            case 'Mentioned' : 
                return 'http://localhost:3000/issues/mentioned'
            default:
                return ''
        }
    }
  return (
    <Link className={`
    ${type === 'Created' && 'rounded-l-md linkStyle'} 
    ${type === 'Assigned' && 'border-y border-githubBorder text-sm font-semibold text-white py-[5px] px-3'} 
    ${type === 'Mentioned' && 'rounded-r-md linkStyle'} 
    ${type !== 'Created' && path !== compareType && 'hover:bg-repohover'}
    ${path === compareType && 'bg-linkactive '} 
    ${!path && type === 'Created' && 'bg-linkactive'}`} 
    href={router(type)}>{type}</Link>
  )
}

export default IssueHomePageLink