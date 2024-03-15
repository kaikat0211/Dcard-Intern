import Link from 'next/link'
import React from 'react'
import IssuePageLink from '../../components/IssuePageLink'

const page = () => {
  return (
    <div className='w-full flex justify-center'>
        <div className='flex justify-center bg-bodycolor w-full h-[100vh] pt-6 max-lg:px-10 lg:px-4'>
            <div className='bg-bodycolor w-[980px] '>
                <nav className=' flex'>
                    <IssuePageLink type={'Created'}/>
                    <IssuePageLink type={'Assigned'}/>
                    <IssuePageLink type={'Mentioned'}/>
                </nav>
            </div>
        </div>
    </div>
  )
}

export default page