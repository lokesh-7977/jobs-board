import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/app/favicon.ico';

const Footer = () => {
  return (
    <div className='flex md:flex-row flex-col md:gap-3 gap-12 md:px-20 px-8 py-8 bg-[#282773] text-white'>
      <div className='flex-1'>
        <div className='flex items-center mb-2'>
          <Image src={Logo} width={60} height={60} alt='Job Seek' />
          <h1 className="ml-2">Name</h1>
        </div>
        <p className='mb-3'>We transform the way candidates find jobs and companies hire talent.</p>
        <p>&copy; {new Date().getFullYear()}</p>
      </div>

      <div className='flex flex-col gap-2 flex-1 md:px-40'>
        <Link href='/'>
          <p className='outline-0'>About</p>
        </Link>
        <Link href='/'>
          <p className='outline-0'>Careers</p>
        </Link>
        <Link href='/'>
          <p className='outline-0'>Internships</p>
        </Link>
        <Link href='/'>
          <p className='outline-0'>Press</p>
        </Link>
        <Link href='/'>
          <p className='outline-0'>Blog</p>
        </Link>
        <Link href='/'>
          <p className='outline-0'>Contact</p>
        </Link>
      </div>

      <div className='flex flex-col gap-2 flex-1'>
        <h1 className='font-bold text-gray-400'>CANDIDATE</h1>
        <Link href='/'>
          <p className='outline-0'>Job Board</p>
        </Link>
        <Link href='/'>
          <p className='outline-0'>Career Advice</p>
        </Link>
        <Link href='/'>
          <p className='outline-0'>Help for Jobseekers</p>
        </Link>
        <Link href='/'>
          <p className='outline-0'>Jobseeker Guide</p>
        </Link>
      </div>
    </div>
  );
};

export default Footer;
