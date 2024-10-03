/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible, AiOutlineUser } from "react-icons/ai";
import { BiLock } from "react-icons/bi";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/custom/Navbar";
import Footer from "@/components/custom/Footer";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import React from "react";

const signupSchema = z
  .object({
    name: z.string().nonempty({ message: "Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
    passwordConfirmation: z
      .string()
      .min(6, { message: "Password confirmation is required" }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"],
  });

type SignupFormData = z.infer<typeof signupSchema>;

const Jobseeker = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    const { passwordConfirmation, ...signupData } = data;
    // Add role to the signupData
    const signupPayload = {
      ...signupData,
      role: "jobseeker", // Set the role as 'jobseeker'
    };
    
    try {
      const response = await axios.post("/api/register", signupPayload);
      toast.success("Account created successfully!");
      window.location.href = "/jobs";
    } catch (error) {
      toast.error("Failed to create account");
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <Navbar />
      <div className="bg-[#FAFAFA] px-10 py-16">
        <div className="bg-white w-full max-w-[600px] border border-gray-300 m-auto px-8 py-12">
          <h1 className="text-xl text-center mb-7 text-gray-600">Sign Up</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-7">
              <Label htmlFor="name" className="flex items-center gap-3">
                <AiOutlineUser className="text-lg text-gray-500" />
                <Input
                  id="name"
                  type="text"
                  {...register("name")}
                  placeholder="Name"
                  className={`outline-0 w-full text-sm h-10 ${
                    errors.name ? "border-red-500" : ""
                  }`}
                />
              </Label>
              {errors.name && (
                <p className="text-red-500 text-center text-sm">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="mb-7">
              <Label htmlFor="email" className="flex items-center gap-3">
                <AiOutlineUser className="text-lg justify-center text-gray-500" />
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="Email address"
                  className={`outline-0 w-full text-sm h-10 ${
                    errors.email ? "border-red-500" : ""
                  }`}
                />
              </Label>
              {errors.email && (
                <p className="text-red-500 text-center text-sm">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="mb-7">
              <Label htmlFor="password" className="flex items-center gap-3">
                <BiLock className="text-lg text-gray-500" />
                <div className="flex flex-row border-gray-200 rounded-lg border-2 w-full gap-6 justify-center items-center">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    placeholder="Password"
                    className={`outline-0 border-none w-full text-sm h-10 pr-3 ${
                      errors.password ? "border-red-500 justify-center" : ""
                    }`}
                  />
                  {showPassword ? (
                    <AiFillEyeInvisible
                      onClick={() => setShowPassword(false)}
                      className="cursor-pointer text-gray-500 mr-3 text-lg"
                    />
                  ) : (
                    <AiFillEye
                      onClick={() => setShowPassword(true)}
                      className="cursor-pointer text-gray-500 mr-3 text-lg"
                    />
                  )}
                </div>
              </Label>
              {errors.password && (
                <p className="text-red-500 text-center text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="mb-7">
              <Label
                htmlFor="passwordConfirmation"
                className="flex items-center gap-3"
              >
                <BiLock className="text-lg text-gray-500" />
                <div className="flex flex-row border-gray-200 rounded-lg border-2 w-full gap-6 justify-center items-center">
                  <Input
                    id="passwordConfirmation"
                    type={showPasswordConfirmation ? "text" : "password"}
                    {...register("passwordConfirmation")}
                    placeholder="Password confirmation"
                    className={`outline-0 w-full border-none bg-none text-sm h-10 pr-3 ${
                      errors.passwordConfirmation ? "border-red-500 " : ""
                    }`}
                  />
                  {showPasswordConfirmation ? (
                    <AiFillEyeInvisible
                      onClick={() => setShowPasswordConfirmation(false)}
                      className="cursor-pointer text-gray-500 mr-3 text-lg"
                    />
                  ) : (
                    <AiFillEye
                      onClick={() => setShowPasswordConfirmation(true)}
                      className="cursor-pointer text-gray-500 mr-3 text-lg"
                    />
                  )}
                </div>
              </Label>
              {errors.passwordConfirmation && (
                <p className="text-red-500 text-center text-sm">
                  {errors.passwordConfirmation.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="bg-[#504ED7] hover:bg-[#2825C2] cursor-pointer transition-[background] text-sm w-full py-3 text-white rounded-sm mt-7"
            >
              Sign Up
            </Button>
          </form>
          <p className="mt-8 text-gray-400 text-sm text-center">
            Already have an account?
            <Link className="outline-0 text-blue-500" href={"/login"}>
              {" "}
              Sign in
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Jobseeker;
