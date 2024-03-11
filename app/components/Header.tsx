'use client'
import * as React from 'react';
import Nav from './Nav'
import { IoSearchOutline } from "react-icons/io5";
import { LiaGreaterThanEqualSolid } from "react-icons/lia";
import { FaPlus } from "react-icons/fa6";
import { IoMdArrowDropdown } from "react-icons/io";
import { VscRecord } from "react-icons/vsc";
import { IoBagHandleOutline } from "react-icons/io5";
import WhiteMark from "../../public/WhiteMark.svg"
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import Image from 'next/image';
import pullRequest from '../../public/pullRequest.svg'
import LeftDrawer from './LeftDrawer';
import { fetchUser } from '@/lib/features/userSlice';
import { usePathname, useRouter } from 'next/navigation';


    interface ProfileData {
      userInfo: UserInfo,
      repoInfo: RepoInfo
    }
    interface UserInfo {
      login: string;
      avatar_url: string;
    }
  
  interface RepoInfo {
      [repoName: string]: {
        getIssueUrl: string;
      };
    }

    export default  function Header({ profileData } : { profileData: ProfileData }) {
    const dispatch = useAppDispatch();
    const state = useAppSelector(state => state.user)
    const pathname = usePathname()
    const router = useRouter()
    const path = pathname.split('/')[2]
    useEffect(() => {
        dispatch(fetchUser(profileData));
    }, [dispatch]);  //先不放profileData
  return (
    <>
      <div className='p-4 flex justify-between sticky z-999 bg-black'>
        <div className='flex gap-3 items-center h-[32px]'>  
          <LeftDrawer />
          <div 
          className='cursor-pointer' 
          onClick={() => {router.push('http://localhost:3000/')}}
          >
              <Image src={WhiteMark} alt='mark' width={32} height={32}  className='w-[32px] h-[32px]'/>
          </div>
          <div>
              <button 
              className={`simpleButtonStyle ${path ? 'font-light' : 'font-semibold'}`}
              onClick={() => {router.push('http://localhost:3000/')}}
              >
              {state.name}
              </button>
              {path !== '404' && path && <span className='font-light text-slate-500'>/</span>}
              {path !== '404' && path  && <button className='simpleButtonStyle font-semibold'>{path}</button>}
          </div>
        </div>
        <div className='flex gap-2.5 h-[32px]'>
          <button className='border p-1 border-githubBorder rounded-md flex items-center gap-1 justify-between w-[350px]'>
              <div className='flex items-center'>
                  <IoSearchOutline className='m-[3px] text-md text-slate-400'/>
                  <div className='text-sm font-light text-slate-400 ml-1'>Type <span className='text-[12px] border-[0.5px]  rounded-sm border-slate-400 px-1 py-[1px]'>/</span> to search</div>
              </div>
              <div className='border-l m-1 border-githubBorder'>
                  <LiaGreaterThanEqualSolid className='ml-2 text-slate-400'/>
              </div>
          </button>
          <div className='my-1.5 border-[0.5px] border-githubBorder'></div>
          <button className='borderButtonStyle hover:bg-repohover flex gap-1 items-center'>
              <FaPlus className='ml-1 text-slate-400 text-sm'/>
              <IoMdArrowDropdown className='mr-1 text-slate-400'/>
          </button>
          <button className='borderButtonStyle hover:bg-repohover center'>
              <VscRecord className='text-slate-400 text-[18px]'/>
          </button>
          <button className='borderButtonStyle hover:bg-repohover center'>
              <Image alt='pulls' src={pullRequest} width={20} height={20}/>
          </button>
          <button className='borderButtonStyle hover:bg-repohover center'>
              <IoBagHandleOutline className='text-slate-400 text-[18px]'/>
          </button>
          <div className='rounded-full'>
              {state.photo ? <Image alt={state.photo ?? "Profile Pic"} src={state.photo} width={32} height={32} className='rounded-full cursor-pointer'/> : <></>}
          </div>
        </div>
      </div>
      {path && <Nav />}
    </>
  );
}
