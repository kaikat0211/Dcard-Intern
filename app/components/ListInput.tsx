import React from 'react'
import Search from '@/public/search.svg'
import Image from 'next/image'
const ListInput = () => {
  return (
    <div className='w-full pl-4'>
        <form className='relative '>
        <Image alt='searchicon' src={Search} width={15} height={15} className='absolute left-2 bottom-2'/>
        <input type='text' 
        className='w-full text-sm rounded-md outline-0 border border-githubBorder pl-8 pr-3 py-[5px]  focus:ring-inputcolor focus:ring-2 text-white' 
        style={{background: '#02040A'}}
        name='title'
        // value={`is:open is:issue author:kaikat0211 archived:false `}
        placeholder={'Title'} />
        </form>
    </div>
  )
}

export default ListInput