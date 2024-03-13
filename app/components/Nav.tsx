'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Code from '../../public/code.svg'
import Image from 'next/image'
import Issues from '../../public/issue.svg'
import pullRequest from '../../public/pullRequest.svg'
import Actions from '../../public/actions.svg'
import Projects from '../../public/projects.png'
import Wiki from '../../public/wiki.svg'
import Insights from '../../public/insights.svg'
import Settings from '../../public/settings.svg'
import { usePathname } from 'next/navigation'
const navOptions: [string, string, string][] = [[Code, 'Code', ''], [Issues, 'Issues', 'issues'], [pullRequest, 'Pull request', 'pulls'], [Actions, 'Actions', 'actions'],[Projects, 'Projects', 'projects'], [Wiki, 'Wiki', 'wiki'], [Insights, 'Insights', 'insights'], [Settings, 'Settings', 'settings']]

const Nav: React.FC  = () => {
    const pathname = usePathname()
    const [asPath, setAsPath] = useState(pathname)
    useEffect(()=>{
        if(pathname.split('/').length < 3) return
        setAsPath(pathname.split('/').slice(0, 3).join('/'))
    },[pathname])
    const path : string = pathname.split('/')[3]
  return (
    <div className='w-full px-4 pb-2 pt-1 border-b border-bordercolor sticky z-999 bg-black'>
        <ul className='flex gap-4 '>
            {navOptions.map((options => (
                <li key={options[1]} className='hover:bg-repohover rounded-lg flex items-center relative'>
                <Link href={`${asPath}/${options[2]}`}  className={`flex gap-2 items-center h-full mx-2 my-1.5 ${path === undefined && options[2] === navOptions[0][2] ? 'activeStyle' : path === options[2] && 'activeStyle'}`}>
                    <Image alt='icon' src={options[0]} width={17} height={17} className='w-[17px] h-[17px]'/>
                    <div className={` text-white  text-sm ${path ===  options[2] && 'font-semibold'}`}>{options[1]}</div>
                </Link>
            </li>
            )))}   
        </ul>
    </div>
  )
}

export default Nav