"use client";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const registerSchema = z.object({
  accountType: z.enum(["jobseeker", "organization"], {
    errorMap: () => ({ message: "Please select an account type." }),
  }),
});

type RegisterFormData = z.infer<typeof registerSchema>;

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
    if (data.accountType === "jobseeker") {
      window.location.href = "/jobseeker";
    } else if (data.accountType === "organization") {
      window.location.href = "/organization";
    }
  };

  return (
    <div className="bg-[#FaFaFa] px-10 py-14 grid place-content-center h-screen">
      <div className="w-full max-w-[1000px] m-auto text-center">
        <h1 className=" mb-3 text-lg font-semibold">We&apos;re glad you&apos;re here!</h1>
        <p className="text-sm mb-10">First of all, what do you want to do?</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center gap-8 md:flex-row flex-col">
            <div className="bg-white flex-1 py-16 px-5 rounded-md shadow-md border border-gray-200">
              <Label className="block">
                <h1 className="font-medium text-2xl font-bold">I am looking for work</h1>
                <p className="text-sm mt-5 mb-10">
                  Create a <strong>jobseeker</strong> account.
                </p>
                <Input
                  type="radio"
                  value="jobseeker"
                  {...register("accountType")}
                  className="hidden"
                  id="jobseeker"
                />
                <Link href="/job-seeker">
                <Button
                  type="submit"
                  className="bg-[#504ED7] hover:bg-[#2825C2] transition-[background] px-5 py-3 rounded-sm text-sm text-white"
                >
                  START LOOKING FOR JOBS
                </Button>
                </Link>
              </Label>
            </div>

            <strong>OR</strong>

            <div className="bg-white flex-1 py-16 px-5 rounded-md w-[40rem] shadow-md border border-gray-200">
              <Label className="block">
                <h1 className=" text-2xl font-bold">I am looking to hire</h1>
                <p className="text-sm mt-5 mb-10">
                  Create an <strong>organization</strong> account.
                </p>
                <Input
                  type="radio"
                  value="organization"
                  {...register("accountType")}
                  className="hidden"
                  id="organization"
                />
                <Link href="/organisation">
                <Button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 transition-[background] px-5 py-3 rounded-sm text-sm text-white"
                >
                  START LOOKING FOR CANDIDATES
                </Button>
                </Link>
              </Label>
            </div>
          </div>

          {errors.accountType && (
            <p className="text-red-500 text-sm mt-2">{errors.accountType.message}</p>
          )}

          <p className="text-sm text-gray-500 mt-10">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500">
              Sign in
            </Link>
            .
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
