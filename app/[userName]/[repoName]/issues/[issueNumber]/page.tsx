import IssuePageTitle from '@/app/components/IssuePageTitle'
import React from 'react'

const page = ({ params } : { params: { issueNumber: string } }) => {
  return (
    <div className='mt-6 mx-20 px-10'>
        <IssuePageTitle />
    </div>
  )
}

export default page