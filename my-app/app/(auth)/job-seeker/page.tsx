/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible, AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { BiLock, BiUser } from "react-icons/bi";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/custom/Navbar";
import Footer from "@/components/custom/Footer";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import React from "react";
import Image from "next/image";
import QR from "./../../logo.jpg";

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
    mobileNumber: z
      .string()
      .regex(/^[0-9]{10}$/, { message: "Invalid mobile number" }),
    utr: z
      .string()
      .length(12, { message: "UTR must be exactly 12 digits" })
      .regex(/^\d{12}$/, { message: "UTR must contain only digits" }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"],
  });

type SignupFormData = z.infer<typeof signupSchema>;

const Jobseeker = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
  const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });
  const router = useRouter();

  const onSubmit = async (data: SignupFormData) => {
    const { passwordConfirmation, ...signupData } = data;
    const signupPayload = {
      ...signupData,
      role: "jobSeeker",
    };

    try {
      const response = await axios.post("/api/auth/register", signupPayload);
      toast.success("Account created successfully!");
      router.push("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.error || "Failed to create account");
      } else {
        toast.error("Failed to create account");
      }
    }
  };

  const handlePasswordConfirmationBlur = () => {
    if (errors.passwordConfirmation?.message === undefined) {
      setIsPasswordConfirmed(true);
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
                <BiUser className="text-lg text-gray-500" />
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
                <AiOutlineMail className="text-lg justify-center text-gray-500" />
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
              <Label htmlFor="mobileNumber" className="flex items-center gap-3">
                <AiOutlinePhone className="text-lg text-gray-500" />
                <Input
                  id="mobileNumber"
                  type="text"
                  {...register("mobileNumber")}
                  placeholder="Mobile Number"
                  className={`outline-0 w-full text-sm h-10 ${
                    errors.mobileNumber ? "border-red-500" : ""
                  }`}
                />
              </Label>
              {errors.mobileNumber && (
                <p className="text-red-500 text-center text-sm">
                  {errors.mobileNumber.message}
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
                    onBlur={handlePasswordConfirmationBlur}
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

            <div className="flex justify-center mb-7">
              <Image
                src={QR}
                alt="QR Code for Payment"
                width={200}
                height={200}
              />
            </div>

            {/* UTR Number Field */}
            <div className="mb-7">
              <Label htmlFor="utr" className="flex items-center gap-3">
                <BiLock className="text-lg text-gray-500" />
                <Input
                  id="utr"
                  type="text"
                  {...register("utr")}
                  placeholder="UTR Number (12 digits)"
                  className={`outline-0 w-full text-sm h-10 ${
                    errors.utr ? "border-red-500" : ""
                  }`}
                />
              </Label>
              {errors.utr && (
                <p className="text-red-500 text-center text-sm">
                  {errors.utr.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300 ease-in-out"
            >
              Sign Up
            </Button>
          </form>
          <p className="text-center text-gray-500 text-sm mt-5">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500 hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Jobseeker;
