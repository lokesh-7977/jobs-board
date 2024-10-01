"use client";
import Link from "next/link";
import React from "react";

const Register = () => {
  
  return (
    <>
      {/* <Navbar /> */}
      <div className="bg-[#FaFaFa] px-10 py-14">
        <div className="w-full max-w-[1000px] m-auto text-center">
          <h1 className="font-medium mb-3 text-lg">We&apos;re glad you&apos;re here!</h1>
          <p className="text-sm mb-10">First of all, what do you want to do?</p>
          <div className="flex items-center gap-8 md:flex-row flex-col">
            <div className="bg-white flex-1 py-16 px-5 rounded-md shadow-md border border-gray-200">
              <h1 className="font-medium text-2xl">I am looking for work</h1>
              <p className="text-sm mt-5 mb-10">Create a <strong>jobseeker</strong> account.</p>
              <Link
                href="/jobseeker"
                className="bg-[#504ED7] hover:bg-[#2825C2] transition-[background] px-5 py-3 rounded-sm text-sm text-white"
              >
                START LOOKING FOR JOBS
              </Link>
            </div>
            <strong>OR</strong>
            <div className="bg-white flex-1 py-16 px-5 rounded-md shadow-md border border-gray-200">
              <h1 className="font-medium text-2xl">I am looking to hire</h1>
              <p className="text-sm mt-5 mb-10">Create an <strong>organization</strong> account.</p>
              <Link
                href="/organization"
                className="bg-green-600 hover:bg-green-700 transition-[background] px-5 py-3 rounded-sm text-sm text-white"
              >
                START LOOKING FOR CANDIDATES
              </Link>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-10">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500">
              Sign in
            </Link>.
          </p>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Register;
