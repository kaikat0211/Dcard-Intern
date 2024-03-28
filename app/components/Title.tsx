'use client'
import React, { ReactNode } from 'react'
interface TitleInputProps {
    titleValue: string
    setTitleValue: (value: string) => void;
    titleRef: React.Ref<HTMLInputElement>; 
    error: React.ReactNode[]
  }

const Title = ({titleValue, setTitleValue, titleRef, error}: TitleInputProps) => {
  return (
    <>
      <h3 className={`font-semibold mb-2 relative ${error?.some(item => typeof item === 'string' && item.includes("標題")) ? 'after:content-["*"] after:text-red-500 after:text-sm' : ''} `}>Add a title</h3>
      <input type='text' 
      className={`w-full text-sm rounded-md outline-0 border border-bordercolor py-2.5 px-3 bg-bodycolor ${
        error?.some(item => typeof item === 'string' && item.includes("標題")) ? "ring-1 ring-red-500" : "focus:ring-inputcolor focus:ring-2"
      }`}
      value={titleValue}
      name='title'
      onChange={(event) => setTitleValue(event.target.value)}
      ref={titleRef}
      placeholder={'Title'} />
    </>
  )
}

export default Title