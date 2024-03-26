import React from 'react'
import Form from '@/app/components/Form'
import { auth } from '@/app/api/auth/[...nextauth]/options';
import { getUserGitHubId } from '@/app/useractions';


const page = async () => {
  const user = await getUserGitHubId()
  let userPhoto
  if(user) userPhoto = user.userPhoto
  return (
    <>
        <Form userPhoto={userPhoto}/>    
    </>
  )
}

export default page