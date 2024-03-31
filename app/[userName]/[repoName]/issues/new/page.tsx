import React from 'react'
import Form from '@/app/components/createIssue/Form'
import { auth } from '@/app/api/auth/[...nextauth]/options';
import { getUserGitHubId } from '@/app/useractions';


const page = async () => {
  const user = await getUserGitHubId()
  const userPhoto = user ? user.userPhoto : null
  return (
    <>
        <Form userPhoto={userPhoto}/>    
    </>
  )
}

export default page