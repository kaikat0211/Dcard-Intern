'use client'
import * as React from 'react';
import { VscRecord } from "react-icons/vsc";
import WhiteMark from "../../public/WhiteMark.svg"
import { useEffect } from 'react';
import { useAppDispatch } from '@/lib/hooks';
import Image from 'next/image';
import LeftDrawer from './LeftDrawer';
import { fetchUser } from '@/lib/features/userSlice';
import { usePathname, useRouter } from 'next/navigation';
import SignOut from './SignOut';

    interface ProfileData {
      userInfo: UserInfo,
      repoInfo: RepoInfo,
      token: string
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

    export default  function Header({ profileData , photo} : { profileData: ProfileData , photo : string | undefined}) {
    const [open, setOpen] = React.useState(false)
    const divRef = React.useRef<HTMLDivElement>(null)
    const singOutRef = React.useRef<HTMLDivElement>(null)
    const dispatch = useAppDispatch();
    const pathname = usePathname()
    const router = useRouter()
    const path = pathname.split('/')[2]
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
          if (singOutRef.current && !singOutRef.current.contains(event.target as Node) && divRef.current && !divRef.current.contains(event.target as Node) ) {
              setOpen(false);
          }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
          document.removeEventListener('mousedown', handleClickOutside);
      };
  }, [singOutRef]);
    useEffect(() => {
        dispatch(fetchUser(profileData));
    }, [dispatch]);
  return (
    <>
      <div className='p-4 flex justify-between sticky z-999 bg-black'>
        <div className='flex gap-3 items-center h-[32px]'>  
          <LeftDrawer />
          <div 
          className='cursor-pointer' 
          onClick={() => {router.push('/')}}
          >
              <Image src={WhiteMark} alt='mark' width={32} height={32}  className='w-[32px] h-[32px]'/>
          </div>
          <div>
              {pathname.split('/')[1] !== 'issues' ? 
              (<button 
                className={`simpleButtonStyle ${path ? 'font-light' : 'font-semibold'}`}
                onClick={() => {router.push('/')}}
                >
                {pathname.split('/')[1]}
                </button>
              ) :
              (
                <div className='p-1.5 text-sm rounded-md text-white font-semibold'>
                  Issues
                </div>
              )
              }
              {path !== '404' && pathname.split('/')[1] !== 'issues' && path && <span className='font-light text-slate-500'>/</span>}
              {path !== '404' && pathname.split('/')[1] !== 'issues' && path  && <button className='simpleButtonStyle font-semibold'>{path}</button>}
          </div>
        </div>
        <div className='flex gap-2.5 h-[32px]'>
          <button className='borderButtonStyle hover:bg-repohover center' onClick={()=> router.push('/issues')}>
              <VscRecord className='text-slate-400 text-[18px]'/>
          </button>
          <div className='rounded-full relative' ref={divRef}>
              {photo ? <Image alt={photo ?? "Profile Pic"} src={photo} width={32} height={32} className='rounded-full cursor-pointer ' onClick={()=>setOpen(true)}/> : <></>}
              {open && <SignOut singOutRef={singOutRef}/>}
          </div>
        </div>
      </div>
    </>
  );
}
