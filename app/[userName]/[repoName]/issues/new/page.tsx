import React from 'react'
import Form from '@/app/components/Form'
import { auth } from '@/app/api/auth/[...nextauth]/options';


const page = async () => {
  return (
    <>
        <Form />    
    </>
  )
}

export default page