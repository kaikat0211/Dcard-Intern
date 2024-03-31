import React from 'react'
import IssueHomePageLink from './IssueHomePageLink'

const LinkGroup = () => {
  return (
    <nav className='flex flex-grow-0'>
        <IssueHomePageLink type={'Created'}/>
        <IssueHomePageLink type={'Assigned'}/>
        <IssueHomePageLink type={'Mentioned'}/>
    </nav>
  )
}

export default LinkGroup