import React from 'react'
import IssuePageLink from './IssuePageLink'

const LinkGroup = () => {
  return (
    <nav className='flex flex-grow-0'>
        <IssuePageLink type={'Created'}/>
        <IssuePageLink type={'Assigned'}/>
        <IssuePageLink type={'Mentioned'}/>
    </nav>
  )
}

export default LinkGroup