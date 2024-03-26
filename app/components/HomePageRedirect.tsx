'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const HomePageRedirect = ({ isUserLogIn }:{ isUserLogIn : boolean | {}}) => {
    const router = useRouter()
    useEffect(()=>{
        if(isUserLogIn) router.push('/issues')
    },[])
  return (
    <></>
  )
}

export default HomePageRedirect