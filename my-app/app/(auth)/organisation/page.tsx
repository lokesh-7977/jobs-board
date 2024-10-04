"use client"; 
import { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useForm } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface IFormInputs {
  name: string;
  email: string;
  phoneNumber: string;
  createdDate: string;
  totalEmployee: number;
  industryType: string;
  province: string;
  city: string;
  district: string;
  postalCode: number;
  address: string;
  password: string;
  passwordConfirmation?: string;
  logo: string; 
  role: string; 
  description: string;
}

const Organization = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<IFormInputs>();
  const router = useRouter();

  const onSubmit = async (data: IFormInputs) => {
    const submittedData = {
      ...data,
      createdDate: new Date().toISOString().split('T')[0], // Set created date on form submission
      postalCode: Number(data.postalCode), 
      totalEmployee: Number(data.totalEmployee),
      role: 'employer',
    };

    try {
      const response = await axios.post('/api/auth/register', submittedData);
      if (response.status === 200 || response.status === 201) {
        toast.success('Organization registered successfully!');
        reset();
        router.push('/login');
      } else {
        toast.error('Failed to register the organization.');
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(`Error: ${error.response.data.error || 'An error occurred'}`);  
      } else {
        toast.error('An unexpected error occurred.');
      }
    }
  };

  return (
    <div className="bg-[#FAFAFA] px-10 py-14">
      <h1 className="text-center mb-10 text-2xl font-semibold text-[#504ED7]">Recruit Better With Carrers Connect</h1>
      <div className="bg-white w-full max-w-[1000px] border border-gray-300 m-auto px-8 py-12">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Form Fields */}
          <div className="flex md:flex-row flex-col md:items-center gap-7 md:mb-10 mb-7">
            <div className="flex-1">
              <Label htmlFor="name" className="text-sm">Organization Name</Label>
              <Input
                id="name"
                {...register('name', { required: 'Organization Name is required' })}
              />
              {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
            </div>
            <div className="flex-1">
              <Label htmlFor="email" className="text-sm">Organization Email</Label>
              <Input
                type="email"
                id="email"
                {...register('email', { required: 'Email is required' })}
              />
              {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
            </div>
          </div>

          <div className="flex md:flex-row flex-col md:items-center gap-7 md:mb-10 mb-7">
            <div className="flex-1">
              <Label htmlFor="phoneNumber" className="text-sm">Phone Number</Label>
              <Input
                id="phoneNumber"
                {...register('phoneNumber', { required: 'Phone Number is required' })}
              />
              {errors.phoneNumber && <p className="text-red-500 text-xs">{errors.phoneNumber.message}</p>}
            </div>
            <div className="flex-1">
              <Label htmlFor="totalEmployee" className="text-sm">Total Employees</Label>
              <Input
                type="number"
                id="totalEmployee"
                {...register('totalEmployee', { required: 'Total Employees is required' })}
              />
              {errors.totalEmployee && <p className="text-red-500 text-xs">{errors.totalEmployee.message}</p>}
            </div>
          </div>

          <div className="flex md:flex-row flex-col md:items-center gap-7 md:mb-10 mb-7">
            <div className="flex-1">
              <Label htmlFor="industryType" className="text-sm">Industry Type</Label>
              <Input
                id="industryType"
                {...register('industryType', { required: 'Industry Type is required' })}
              />
              {errors.industryType && <p className="text-red-500 text-xs">{errors.industryType.message}</p>}
            </div>
            <div className="flex-1">
              <Label htmlFor="province" className="text-sm">Province</Label>
              <Input
                id="province"
                {...register('province', { required: 'Province is required' })}
              />
              {errors.province && <p className="text-red-500 text-xs">{errors.province.message}</p>}
            </div>
          </div>

          <div className="flex md:flex-row flex-col md:items-center gap-7 md:mb-10 mb-7">
            <div className="flex-1">
              <Label htmlFor="city" className="text-sm">City</Label>
              <Input
                id="city"
                {...register('city', { required: 'City is required' })}
              />
              {errors.city && <p className="text-red-500 text-xs">{errors.city.message}</p>}
            </div>
            <div className="flex-1">
              <Label htmlFor="district" className="text-sm">District</Label>
              <Input
                id="district"
                {...register('district', { required: 'District is required' })}
              />
              {errors.district && <p className="text-red-500 text-xs">{errors.district.message}</p>}
            </div>
          </div>

          <div className="flex md:flex-row flex-col md:items-center gap-7 md:mb-10 mb-7">
            <div className="flex-1">
              <Label htmlFor="postalCode" className="text-sm">Postal Code</Label>
              <Input
                type="number"
                id="postalCode"
                {...register('postalCode', { required: 'Postal Code is required' })}
              />
              {errors.postalCode && <p className="text-red-500 text-xs">{errors.postalCode.message}</p>}
            </div>
            <div className="flex-1">
              <Label htmlFor="address" className="text-sm">Address</Label>
              <Input
                id="address"
                {...register('address', { required: 'Address is required' })}
              />
              {errors.address && <p className="text-red-500 text-xs">{errors.address.message}</p>}
            </div>
          </div>

          <div className="flex md:flex-row flex-col md:items-center gap-7 md:mb-10 mb-7">
            <div className="flex-1">
              <Label htmlFor="description" className="text-sm">Description</Label>
              <Input
                id="description"
                {...register('description', { required: 'Description is required' })}
              />
              {errors.description && <p className="text-red-500 text-xs">{errors.description.message}</p>}
            </div>
            <div className="flex-1">
              <Label htmlFor="logo" className="text-sm">Logo URL</Label>
              <Input
                id="logo"
                {...register('logo', { required: 'Logo URL is required' })}
              />
              {errors.logo && <p className="text-red-500 text-xs">{errors.logo.message}</p>}
            </div>
          </div>

          <div className="flex md:flex-row flex-col md:items-center gap-7 md:mb-10 mb-7">
            <div className="flex-1">
              <Label htmlFor="password" className="text-sm">Password</Label>
              <div className="flex items-center border border-gray-300 mt-3 rounded-md px-2 py-3 gap-2">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  {...register('password', { required: 'Password is required' })}
                  className="w-full h-[1.2rem] bg-transparent rounded-none border-none text-black focus:ring-0 focus:outline-none"
                />
                {showPassword ? (
                  <AiFillEyeInvisible onClick={() => setShowPassword(false)} className="text-gray-400 cursor-pointer" />
                ) : (
                  <AiFillEye onClick={() => setShowPassword(true)} className="text-gray-400 cursor-pointer" />
                )}
              </div>
              {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
            </div>
            <div className="flex-1">
              <Label htmlFor="passwordConfirmation" className="text-sm">Confirm Password</Label>
              <div className="flex items-center border border-gray-300 mt-3 rounded-md px-2 py-3 gap-2">
                <Input
                  type={showPasswordConfirmation ? 'text' : 'password'}
                  id="passwordConfirmation"
                  {...register('passwordConfirmation', { required: 'Confirm Password is required' })}
                  className="w-full h-[1.2rem] bg-transparent rounded-none border-none text-black focus:ring-0 focus:outline-none"
                />
                {showPasswordConfirmation ? (
                  <AiFillEyeInvisible onClick={() => setShowPasswordConfirmation(false)} className="text-gray-400 cursor-pointer" />
                ) : (
                  <AiFillEye onClick={() => setShowPasswordConfirmation(true)} className="text-gray-400 cursor-pointer" />
                )}
              </div>
              {errors.passwordConfirmation && <p className="text-red-500 text-xs">{errors.passwordConfirmation.message}</p>}
            </div>
          </div>

          <div className="mt-8">
            <Button type="submit" className="bg-[#504ED7] w-full text-white hover:bg-[#373E80]">Register Organization</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Organization;
