import React from 'react'
import { BsCheckCircle } from "react-icons/bs";

const CloseIssueButton = () => {
  return (
    <div className='flex justify-end'>
        <button className='mt-2 border border-githubBorder py-[5px] px-4  flex items-center gap-2 bg-bordercolor hover:bg-closebuttonbg rounded-lg justify-center '>
            <BsCheckCircle style={{color : '#A371F7'}} className='text-base font-semibold'/>
            <div style={{color : '#C9D1D9'}} className=' text-sm font-medium'>Close issue</div>
        </button>
    </div>
  )
}

export default CloseIssueButton