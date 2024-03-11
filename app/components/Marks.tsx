import React from 'react'
import { IoSettingsOutline } from "react-icons/io5";
const Marks = ({ props } : { props : string[]}) => {
  return (
    <div className="border-b pb-4 mb-4 border-githubBorder" key={props[0]}>
        <div className="flex justify-between text-textgray hover:text-inputcolor text-sm font-semibold cursor-pointer">
            <div>{props[0]}</div>
            <IoSettingsOutline className=" w-[15px] h-[16px]"/>
        </div>
        <div className='text-xs mt-2'>
            {props[1]}{props[0] === 'Assignees' && <span className='text-textgray hover:text-inputcolor text-xs underline underline-offset-2 cursor-pointer'>assign yourself</span>}
        </div>   
    </div>
  )
}

export default Marks