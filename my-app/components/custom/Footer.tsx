import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/app/favicon.ico';

const Footer = () => {
  return (
    <div className='flex md:flex-row flex-col md:gap-3 gap-12 md:px-20 px-8 py-8 bg-[#282773] text-white'>
      <div className='flex-1'>
        <div className='flex items-center mb-2'>
          <Image src={Logo} width={60} height={60} alt='Career Connects Logo' />
          <h1 className="ml-2 text-xl font-bold">Career Connects</h1>
        </div>
        <p className='mb-3 text-sm'>
          We transform the way candidates find jobs and companies hire talent.
        </p>
        <p className='text-sm'>&copy; {new Date().getFullYear()} Career Connects. All Rights Reserved.</p>
      </div>

      <div className='flex flex-col gap-2 flex-1 md:px-40'>
        <h2 className='font-bold text-lg mb-2'>Company</h2>
        <Link href='/'>
          <p className='hover:text-orange-400 transition-colors duration-200 cursor-pointer'>About</p>
        </Link>
        <Link href='/'>
          <p className='hover:text-orange-400 transition-colors duration-200 cursor-pointer'>Careers</p>
        </Link>
        <Link href='/'>
          <p className='hover:text-orange-400 transition-colors duration-200 cursor-pointer'>Internships</p>
        </Link>
        <Link href='/'>
          <p className='hover:text-orange-400 transition-colors duration-200 cursor-pointer'>Press</p>
        </Link>
        <Link href='/'>
          <p className='hover:text-orange-400 transition-colors duration-200 cursor-pointer'>Blog</p>
        </Link>
        <Link href='/'>
          <p className='hover:text-orange-400 transition-colors duration-200 cursor-pointer'>Contact</p>
        </Link>
      </div>

      <div className='flex flex-col gap-2 flex-1'>
        <h2 className='font-bold text-lg mb-2'>Candidate</h2>
        <Link href='/'>
          <p className='hover:text-orange-400 transition-colors duration-200 cursor-pointer'>Job Board</p>
        </Link>
        <Link href='/'>
          <p className='hover:text-orange-400 transition-colors duration-200 cursor-pointer'>Career Advice</p>
        </Link>
        <Link href='/'>
          <p className='hover:text-orange-400 transition-colors duration-200 cursor-pointer'>Help for Jobseekers</p>
        </Link>
        <Link href='/'>
          <p className='hover:text-orange-400 transition-colors duration-200 cursor-pointer'>Jobseeker Guide</p>
        </Link>
      </div>
    </div>
  );
};

export default Footer;
