import {useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import Link from 'next/link'

const Organization = () => {
  const [provinceData, setProvinceData] = useState<IProvinceData[]>([])
  const [cityData, setCityData] = useState<ICityData[]>([])
  const [districtData, setDistrictData] = useState<IDistrictData[]>([])
  const [organizationData, setOrganizationData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    createdDate: '',
    totalEmployee: 0,
    industryType: '',
    province: '',
    city: '',
    district: '',
    postalCode: 0,
    address: '',
    password: '',
    passwordConfirmation: '',
    role: 'organization'
  })
  const [avatar, setAvatar] = useState<File[]>([])
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false)

  return (
    //   <Navbar />
      <div className='bg-[#FAFAFA] px-10 py-14'>
        <h1 className='text-center mb-10 text-2xl font-semibold text-[#504ED7]'>Recruit Better With Job Seek</h1>
        <div className='bg-white w-full max-w-[1000px] border border-gray-300 m-auto px-8 py-12'>
          <form onSubmit={}>
            <div className='flex md:flex-row flex-col md:items-center gap-7 md:mb-10 mb-7'>
              <div className='flex-1'>
                <label htmlFor='name' className='text-sm'>Organization Name</label>
                <input type='text' id='name' name='name' value={organizationData.name} onChange={} className='outline-0 mt-3 w-full px-3 text-sm h-10 border border-gray-300 rounded-md' />
              </div>
              <div className='flex-1'>
                <label htmlFor='email' className='text-sm'>Organization Email</label>
                <input type='text' id='email' name='email' value={organizationData.email} onChange={} className='outline-0 mt-3 w-full px-3 text-sm h-10 border border-gray-300 rounded-md' />
              </div>
            </div>
            <div className='flex md:flex-row flex-col md:items-center gap-7 md:mb-10 mb-7'>
              <div className='flex-1'>
                <label htmlFor='password' className='text-sm'>Password</label>
                <div className='flex items-center border border-gray-300 mt-3 rounded-md px-2 py-3 gap-2'>
                  <input type={showPassword ? 'text' : 'password'} id='password' name='password' value={organizationData.password} onChange={} className='w-full outline-0 text-sm' />
                  {
                    showPassword
                    ? <AiFillEyeInvisible onClick={() => setShowPassword(false)} className='text-gray-400 cursor-pointer' />
                    : <AiFillEye onClick={() => setShowPassword(true)} className='text-gray-400 cursor-pointer' />
                  }
                </div>
              </div>
              <div className='flex-1'>
                <label htmlFor='passwordConfirmation' className='text-sm'>Password Confirmation</label>
                <div className='flex items-center border border-gray-300 mt-3 rounded-md px-2 py-3 gap-2'>
                  <input type={showPasswordConfirmation ? 'text' : 'password'} id='passwordConfirmation' name='passwordConfirmation' value={organizationData.passwordConfirmation} onChange={handleChangeInput} className='outline-0 w-full text-sm pr-3' />
                  {
                    showPasswordConfirmation
                    ? <AiFillEyeInvisible onClick={() => setShowPasswordConfirmation(false)} className='cursor-pointer text-gray-500' />
                    : <AiFillEye onClick={() => setShowPasswordConfirmation(true)} className='cursor-pointer text-gray-500' />
                  }
                </div>
              </div>
            </div>
            <div className='flex md:flex-row flex-col md:items-center gap-7 md:mb-10 mb-7'>
              <div className='flex-1'>
                <label htmlFor='phoneNumber' className='text-sm'>Organization Phone Number</label>
                <input type='text' id='phoneNumber' name='phoneNumber' value={organizationData.phoneNumber} onChange={} className='outline-0 mt-3 w-full px-3 text-sm h-10 border border-gray-300 rounded-md' />
              </div>
              <div className='flex-1'>
                <label htmlFor='createdDate' className='text-sm'>Organization Created Date</label>
                <input type='date' id='createdDate' name='createdDate' value={organizationData.createdDate} onChange={} className='outline-0 mt-3 w-full px-3 text-sm h-10 border border-gray-300 rounded-md' />
              </div>
            </div>
            <div className='flex md:flex-row flex-col md:items-center gap-7 md:mb-10 mb-7'>
              <div className='flex-1'>
                <label htmlFor='totalEmployee' className='text-sm'>Estimated Organization Total Employee</label>
                <input type='number' id='totalEmployee' name='totalEmployee' value={organizationData.totalEmployee} onChange={} className='outline-0 mt-3 w-full px-3 text-sm h-10 border border-gray-300 rounded-md' min={1} />
              </div>
              <div className='flex-1'>
                <label htmlFor='industryType' className='text-sm'>Organization Industry Type (e.g. FnB, Agriculture, etc)</label>
                <input type='text' id='industryType' name='industryType' value={organizationData.industryType} onChange={} className='outline-0 mt-3 w-full px-3 text-sm h-10 border border-gray-300 rounded-md' />
              </div>
            </div>
            <div className='flex md:flex-row flex-col md:items-center gap-7 md:mb-10 mb-7'>
              <div className='flex-1'>
                <label htmlFor='province' className='text-sm'>Province</label>
                <select name='province' value={organizationData.province} onChange={} id='province' className='outline-0 mt-3 w-full px-3 text-sm h-10 border border-gray-300 rounded-md bg-transparent'>
                  <option value=''>- Select Province -</option>
                  {
                    provinceData.map(item => (
                      <option key={item.id} value={item.id}>{item.nama}</option>
                    ))
                  }
                </select>
              </div>
              <div className='flex-1'>
                <label htmlFor='city' className='text-sm'>City</label>
                <select name='city' id='city' value={organizationData.city} onChange={} className='outline-0 mt-3 w-full px-3 text-sm h-10 border border-gray-300 rounded-md bg-transparent'>
                  <option value=''>- Select City -</option>
                  {
                    cityData.map(item => (
                      <option key={item.id} value={item.id}>{item.nama}</option>
                    ))
                  }
                </select>
              </div>
            </div>
            <div className='flex md:flex-row flex-col md:items-center gap-7 md:mb-10 mb-7'>
              <div className='flex-1'>
                <label htmlFor='district' className='text-sm'>District</label>
                <select name='district' id='district' value={organizationData.district} onChange={} className='outline-0 mt-3 w-full px-3 text-sm h-10 border border-gray-300 rounded-md bg-transparent'>
                  <option value=''>- Select District -</option>
                  {
                    districtData.map(item => (
                      <option key={item.id} value={item.id}>{item.nama}</option>
                    ))
                  }
                </select>
              </div>
              <div className='flex-1'>
                <label htmlFor='postalCode' className='text-sm'>Postal Code</label>
                <input type='number' name='postalCode' id='postalCode' value={organizationData.postalCode} onChange={} className='outline-0 mt-3 w-full px-3 text-sm h-10 border border-gray-300 rounded-md' />
              </div>
            </div>
            <div className='md:mb-10 mb-7'>
              <label htmlFor='address' className='text-sm'>Address</label>
              <input type='text' name='address' id='address' value={organizationData.address} onChange={} className='outline-0 mt-3 w-full px-3 text-sm h-10 border border-gray-300 rounded-md' />
            </div>
            <div className='md:mb-10 mb-7'>
              <label htmlFor='logo' className='text-sm'>Organization Logo</label>
              <div className='flex gap-3 mt-3'>
                <div className='w-20 h-20 rounded-full shadow-xl border border-gray-300 shrink-0'>
                  {
                    avatar.length > 0 &&
                    <img src={URL.createObjectURL(avatar[0])} alt={organizationData.name} className='w-full h-full rounded-full object-contain' />
                  }
                </div>
                <input type='file' accept='image/*' id='logo' onChange={} className='outline-0 w-full px-3 text-sm h-10 border border-gray-300 rounded-md' />
              </div>
            </div>
            <div className='md:mb-10 mb-7'>
              <label htmlFor='description' className='text-sm'>Organization Description</label>
            </div>
            <button className={`'bg-gray-200 hover:bg-gray-200 cursor-auto' : 'bg-[#504ED7] hover:bg-[#2825C2] cursor-pointer'} transition-[background] text-sm w-full py-3 text-white rounded-sm`}>
            </button>
          </form>
          <p className='mt-8 text-gray-400 text-sm text-center'>Already have an account? <Link href='/login'><a className='outline-0 text-blue-500'>Sign in</a></Link></p>
        </div>
      </div>
    //   <Footer />
  )
}

export default Organization