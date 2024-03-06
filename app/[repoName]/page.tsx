'use client'
import React from 'react'
const RepoName = ({ params } : { params: { repoName: string } }) => {

  return (
    <>
      <div className='text-white'>{params.repoName}</div>
    </>
  )
}

export default RepoName