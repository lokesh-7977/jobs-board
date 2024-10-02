"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input'; 
import { Label } from '@/components/ui/label'; 
import { Button } from '@/components/ui/button'; 

const forgetPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

type ForgetPasswordFormData = z.infer<typeof forgetPasswordSchema>;

const ForgetPassword = () => {
  const [loading, setLoading] = useState(false);

  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<ForgetPasswordFormData>({
    resolver: zodResolver(forgetPasswordSchema),
  });

  const onSubmit = (data: ForgetPasswordFormData) => {
    setLoading(true);
    console.log("Sending password reset email to:", data.email);

    setTimeout(() => {
      setLoading(false);
      // TODO : add Toast notification
      alert('Password reset email sent successfully!');
    }, 2000);
  };

  return (
    <div className="bg-[#FAFAFA] px-10 py-44">
      <div className="bg-white w-full max-w-[400px] h-[20rem] border border-gray-300 m-auto px-6 py-12">
        <h1 className="text-xl text-center mb-7 text-gray-600">Forgot Password</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label htmlFor="email" className="text-sm">Email</Label>
            <Input 
              type="email" 
              id="email" 
              placeholder="me@example.com"
              {...register('email')} 
              className="w-full outline-0 border border-gray-300 px-2 py-3 text-sm rounded-md mt-3"
            />
            <p className="text-red-500 text-sm mt-1 h-4">
              {errors.email?.message}
            </p>
          </div>

          <Button
            type="submit"
            className={`w-full rounded-none mt-6 ${loading ? 'bg-gray-200 cursor-auto' : 'bg-[#504ED7] hover:bg-[#2825C2] cursor-pointer'}`}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Send Reset Link'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
