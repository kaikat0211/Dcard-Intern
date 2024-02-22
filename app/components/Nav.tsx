'use client'
import Link from 'next/link'
import React from 'react'
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
const navOptions: [string, string, string][] = [[Code, 'Code', 'code'], [Issues, 'Issues', 'issues'], [pullRequest, 'Pull request', 'pulls'], [Actions, 'Actions', 'actions'],[Projects, 'Projects', 'projects'], [Wiki, 'Wiki', 'wiki'], [Insights, 'Insights', 'insights'], [Settings, 'Settings', 'settings']]

const Nav: React.FC  = () => {
    const pathname = usePathname()
    const path : string = pathname.split('/')[1]
    
  return (
    <div className='w-full px-4 pb-2 pt-1 border-b border-bordercolor sticky z-999 bg-black'>
        <ul className='flex gap-4 '>
            {navOptions.map((options => (
                <li key={options[1]} className='hover:bg-repohover rounded-lg flex items-center relative'>
                <Link href={`/${options[2]}`} className={`flex gap-2 items-center h-full mx-2 my-1.5 ${path ===  options[2] && 'activeStyle'}`}>
                    <Image alt='icon' src={options[0]} width={17} height={17}/>
                    <div className={` text-white  text-sm ${path ===  options[2] && 'font-semibold'}`}>{options[1]}</div>
                </Link>
            </li>
            )))}
            
        </ul>
    </div>
  )
}

export default Nav