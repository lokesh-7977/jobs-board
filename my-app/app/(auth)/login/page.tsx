/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react"; // Import NextAuth's signIn function
import Footer from "@/components/custom/Footer";
import Navbar from "@/components/custom/Navbar";
import React from "react";

// Define the validation schema with Zod
const loginSchema = z.object({
  email: z.string().email("Invalid email address"), // Email must be valid
  password: z.string().min(6, "Password must be at least 6 characters long"), // Password validation
});

// Infer the TypeScript type from Zod schema
type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  // React Hook Form integration with Zod resolver for validation
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  // Form submission handler
  const onSubmit = async (data: LoginFormData) => {
    const { email, password } = data;

    // Using NextAuth's signIn function to authenticate the user
    const result = await signIn("credentials", {
      redirect: false, // Prevent automatic redirect
      email,
      password,
    });

    if (result?.error) {
      // Handle error case, e.g., incorrect credentials
      toast.error(result.error || "Failed to log in. Please try again.");
    } else if (result?.ok) {
      // Success: User logged in
      toast.success("Logged in successfully!");
      router.push("/"); // Redirect to homepage after successful login
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-[#FAFAFA] px-10 py-24">
        <div className="bg-white w-full max-w-[400px] border border-gray-300 m-auto px-6 py-12">
          <h1 className="text-xl text-center mb-7 text-gray-600">
            Sign In to Career Connects
          </h1>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email field */}
            <div className="mb-7">
              <Label htmlFor="email" className="text-sm">
                Email
              </Label>
              <Input
                type="email"
                id="email"
                placeholder="me@example.com"
                className="w-full mt-3"
                {...register("email")} // Registering email input field
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email?.message}
                </p>
              )}
            </div>

            {/* Password field */}
            <div className="mb-7">
              <Label htmlFor="password" className="text-sm">
                Password
              </Label>
              <div className="flex items-center border border-gray-300 mt-3 rounded-md px-2 py-3 gap-2">
                <Input
                  type={showPassword ? "text" : "password"} // Toggling password visibility
                  id="password"
                  className="w-full h-[1.2rem] bg-transparent rounded-none border-none focus:ring-0 focus:outline-none"
                  {...register("password")} // Registering password input field
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
              <Link href="/forgot-password">
                <span className="text-blue-500 text-xs mt-2 float-right cursor-pointer">
                  Forgot password?
                </span>
              </Link>
              <div className="clear-both" />
            </div>

            {/* Submit Button */}
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
            Don&apos;t have a Career Connect account yet?{" "}
            <Link href="/register">
              <span className="text-blue-500 cursor-pointer">Sign Up</span>
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
