'use client'
import React from 'react'
interface TitleInputProps {
    titleValue: string;
    setTitleValue: (value: string) => void;
    titleRef: React.Ref<HTMLInputElement>; 
  }

const Title = ({ titleValue, setTitleValue, titleRef }: TitleInputProps) => {
  return (
    <>
    <h3 className='font-semibold mb-2'>Add a title</h3>
    <input type='text' 
    className='w-full text-sm rounded-md outline-0 border border-bordercolor py-2.5 px-3 bg-bodycolor focus:ring-inputcolor focus:ring-2' 
    name='title'
    onChange={(event) => setTitleValue(event.target.value)}
    ref={titleRef}
    placeholder={'Title'} />
    </>
  )
}

export default Title