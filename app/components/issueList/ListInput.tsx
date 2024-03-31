'use client'
import React, { useEffect, useState } from 'react'
import Search from '@/public/search.svg'
import Image from 'next/image'
const ListInput = ({ search, userID } : { search : string | undefined , userID?: string | undefined}) => {
  const [value, setValue] = useState<string | undefined>('')
  useEffect(()=>{
    if(search){
      setValue(search);
    }else if(search === ""){
      setValue(`is:open is:issue`);
    }else{
      setValue(`is:open is:issue author:${userID}`)
    }
  }, [search]);
  return (
    <div className='w-full pl-4 max-md:pl-0 max-md:mt-4 max-xs:px-4'>
        <form className='relative'>
        <Image alt='searchicon' src={Search} width={15} height={15} className='absolute left-2 bottom-2'/>
        <input type='text' 
        className='w-full text-sm rounded-md outline-0 border border-githubBorder bg-labelscolor pl-8 pr-3 py-[5px]  focus:ring-inputcolor focus:ring-2 text-textgray focus:bg-bodycolor' 
        style={{background: '#02040A'}}
        name='p'
        value={value}
        onChange={(event : React.ChangeEvent<HTMLInputElement>)=>{setValue(event.target.value)}} 
        />
        </form>
    </div>
  )
}

export default ListInput