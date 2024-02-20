'use client'
import Image from 'next/image'
import GitHubLogo from '../../public/GitHubLogo.png'
import GitHubMark from '../../public/GitHubMark.png'
import { useRouter } from 'next/navigation'
const Login = () => {
  const router = useRouter()
  return (
    <div className='center mt-60'>
        <div className='flex flex-col items-center gap-10'>
          <Image alt='logo' src={GitHubLogo} width={560} height={200} />
          <Image alt='mark' src={GitHubMark} width={150} height={150} />
          <button className='text-xl' onClick={() => {router.push('/api/auth/signin')}}>Click to sign In</button>
        </div>
        
    </div>
    
  )
}

export default Login