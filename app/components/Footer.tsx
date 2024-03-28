import React from 'react'
import Github from '@/public/GitHubMark.png'
import Image from 'next/image'
const Footer = () => {
  return (
    <>
      <div className='center'>
          <div className='text-textgray text-xs flex gap-3 pt-16 pb-10 px-4 items-center justify-center max-lg:flex-wrap-reverse max-lg:px-10'>
            <div className='flex items-center gap-3'>
              <Image alt='logo' src={Github} width={24} height={24}/>
              <span>© 2024 GitHub, Inc.</span>
            </div>
            <div className='flex gap-3 max-md:flex-wrap justify-center items-center'>
              <span className='footerHover'>Terms</span>
              <span className='footerHover'>Privacy</span>
              <span className='footerHover'>Security</span>
              <span className='footerHover'>Status</span>
              <span className='footerHover'>Docs</span>
              <span className='footerHover'>Contact</span>
              <span className='footerHover'>Manage cookies</span>
              <span className='footerHover'>Do not share my personal information</span>
            </div>
          </div>
      </div>
    </>
  )
}

export default Footer