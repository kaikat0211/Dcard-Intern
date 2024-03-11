import React from 'react'
import Form from '@/app/components/Form'
import { auth } from '@/app/api/auth/[...nextauth]/options';

async function getToken(){
  const session = await auth();
  const token = session?.token;
  return token
}
const page = async () => {
  const token = await getToken()
  return (
    <>
        <Form token={token}/>    
    </>
  )
}

export default page