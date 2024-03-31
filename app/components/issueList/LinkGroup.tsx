import React from 'react'
import IssueHomePageLink from './IssueHomePageLink'

const LinkGroup = () => {
  return (
    <nav className='flex max-xs:w-full max-xs:px-4'>
        <IssueHomePageLink type={'Created'}/>
        <IssueHomePageLink type={'Assigned'}/>
        <IssueHomePageLink type={'Mentioned'}/>
    </nav>
  )
}

export default LinkGroup