"use client"
import { useState, useEffect, useRef } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { GiHamburgerMenu } from 'react-icons/gi'
import { AiOutlineClose } from 'react-icons/ai'
import Link from 'next/link'
import Image from 'next/image'
import Logo from '@/app/favicon.ico';

const Navbar = () => {
  const [openSidebar, setOpenSidebar] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const sidebarRef = useRef() as React.MutableRefObject<HTMLDivElement>

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (openSidebar && sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        setOpenSidebar(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [openSidebar])

  return (
    <div className='flex items-center justify-between gap-10 lg:px-16 pl-4 pr-7 z-[999] py-3 bg-white sticky top-0 shadow-sm'>
      <div onClick={() => router.push('/')} className='flex items-center cursor-pointer'>
        <Image src={Logo} width={60} height={60} alt='Job Seek' />
        <h1 className='text-xl'>Job Seek</h1>
      </div>

      <div onClick={() => setOpenSidebar(true)} className='lg:hidden block'>
        <GiHamburgerMenu className='text-xl cursor-pointer' />
      </div>

      <div
        ref={sidebarRef}
        className={`lg:static fixed top-0 ${openSidebar ? 'right-0' : '-right-[3000px]'} transition-all bottom-0 lg:shadow-none shadow-xl lg:w-auto w-[200px] lg:p-0 p-7 bg-white lg:flex lg:flex-1`}
      >
        <AiOutlineClose onClick={() => setOpenSidebar(false)} className='float-right text-xl mb-5 lg:hidden cursor-pointer' />
        <div className='clear-both' />
        
        <div className='flex-1 lg:flex-row flex-col flex lg:items-center items-start text-sm lg:gap-7 gap-4'>
          <Link href='/'>
            <p className={`navbar-link ${pathname === '/' || pathname === '/index' ? 'active' : undefined}`}>Home</p>
          </Link>
          <Link href='/jobs'>
            <p className={`navbar-link ${pathname === '/jobs' ? 'active' : undefined}`}>Find Jobs</p>
          </Link>
          <Link href='/find_candidate'>
            <p className={`navbar-link ${pathname === '/find_candidate' ? 'active' : undefined}`}>Find Candidates</p>
          </Link>
        </div>

        <div className='text-sm flex lg:flex-row flex-col lg:items-center items-start lg:gap-8 gap-4 mt-10 lg:mt-0'>
          <Link href='/login'>
            <p className={`navbar-link ${pathname === '/login' ? 'active' : undefined}`}>
              Login
            </p>
          </Link>
          <Link href='/register'>
            <p className={`px-6 py-2 border-2 rounded-full border-[#504ED7] ${pathname === '/register' ? 'bg-[#504ED7] text-white' : 'text-[#504ED7]'}`}>
              Register Now
            </p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar
