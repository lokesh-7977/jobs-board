import { useState } from 'react'

const ForgetPassword = () => {
  const [email, setEmail] = useState('')
//   const [loading, setLoading] = useState(false)

  return (
    //   <Navbar />
      <div className='bg-[#FAFAFA] px-10 py-14'>
        <div className='bg-white w-full max-w-[400px] border border-gray-300 m-auto px-6 py-12'>
          <h1 className='text-xl text-center mb-7 text-gray-600'>Forgot Password</h1>
          <form onSubmit={}>
            <div className='mb-4'>
              <label htmlFor='email' className='text-sm'>Email</label>
              <input type='text' id='email' name='email' value={email} onChange={e => setEmail(e.target.value)} placeholder='me@example.com' className='w-full outline-0 border border-gray-300 px-2 py-3 text-sm rounded-md mt-3' />
            </div>
            <button type='submit' className={` 'bg-gray-200 hover:bg-gray-200 cursor-auto' : 'bg-[#504ED7] hover:bg-[#2825C2] cursor-pointer'} outline-0 transition-[background] w-full text-white py-2 mt-6`}>
            </button>
          </form>
        </div>
      </div>
    //   <Footer />
  )
}

export default ForgetPassword