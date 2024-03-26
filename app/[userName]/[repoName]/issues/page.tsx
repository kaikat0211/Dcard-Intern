import { auth } from '@/app/api/auth/[...nextauth]/options';
import CreateIssueButton from '@/app/components/CreateIssueButton'
import Issue from '@/app/components/Issue'
import { CustomSession } from '@/app/types/userTypes';
import React from 'react'

async function getToken() {
  const session = await auth();
  const token = (session as CustomSession)?.token;
  return token
}
const page = async () => {
  const token = await getToken()
  return (
    <>
      <div className='mx-20 mt-6 px-8 border border-bordercolor rounded-lg'>
        <div>
          <div className='bg-black p-4'>123</div>
        </div>
      </div>
    </>
  )
}

export default page