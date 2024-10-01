"use client";

import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    console.log(data);
  };

  return (
    <div className="bg-[#FAFAFA] px-10 py-14">
      <div className="bg-white w-full max-w-[400px] border border-gray-300 m-auto px-6 py-12">
        <h1 className="text-xl text-center mb-7 text-gray-600">
          Sign In to Job Seek
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-7">
            <Label htmlFor="email" className="text-sm">
              Email
            </Label>
            <Input
              type="text"
              id="email"
              placeholder="me@example.com"
              className="w-full mt-3"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email?.message}
              </p>
            )}
          </div>

          <div className="mb-7">
            <Label htmlFor="password" className="text-sm">
              Password
            </Label>
            <div className="flex items-center border border-gray-300 mt-3 rounded-md px-2 py-3 gap-2">
              <Input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full"
                {...register("password")}
              />
              {showPassword ? (
                <AiFillEyeInvisible
                  onClick={() => setShowPassword(false)}
                  className="text-gray-400 cursor-pointer"
                  aria-label="Hide password"
                />
              ) : (
                <AiFillEye
                  onClick={() => setShowPassword(true)}
                  className="text-gray-400 cursor-pointer"
                  aria-label="Show password"
                />
              )}
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password?.message}
              </p>
            )}
            <Link href="/forgot_password">
              <span className="text-blue-500 text-xs mt-2 float-right cursor-pointer">
                Forgot password?
              </span>
            </Link>
            <div className="clear-both" />
          </div>

          <Button
            type="submit"
            className={`${
              isSubmitting
                ? "bg-gray-200 hover:bg-gray-200 cursor-auto"
                : "bg-[#504ED7] hover:bg-[#2825C2] cursor-pointer"
            } w-full text-white py-2 mt-6 transition-[background]`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Loading..." : "SIGN IN"}
          </Button>
        </form>

        <p className="text-sm text-gray-500 text-center mt-8">
          Don&apos;t have a Job Seek account yet?{" "}
          <Link href="/register">
            <span className="text-blue-500 cursor-pointer">Sign Up</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
