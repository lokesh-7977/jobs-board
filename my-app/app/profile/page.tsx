"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Navbar from "@/components/custom/Navbar";
import Footer from "@/components/custom/Footer";

const schema = z.object({
  name: z.string().nonempty("Name is required"),
  email: z.string().email("Invalid email address"),
  ssc: z.string().nonempty("SSC is required"),
  sscPercentage: z.string().nonempty("SSC Percentage is required"),
  inter: z.string().nonempty("Inter is required"),
  interPercentage: z.string().nonempty("Inter Percentage is required"),
  degree: z.string().nonempty("Degree is required"),
  degreePercentage: z.string().nonempty("Degree Percentage is required"),
  resumeLink: z.string().url("Invalid URL").nonempty("Resume link is required"),
  profilePic: z.instanceof(File).optional(), 
});

type ProfileFormData = z.infer<typeof schema>;

const Profile = () => {
  const [profilePicPreview, setProfilePicPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: ProfileFormData) => {
    console.log(data);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setProfilePicPreview(fileReader.result as string);
      };
      fileReader.readAsDataURL(file);
    }
  };

  return (
    <>
    <Navbar />
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">My Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { label: "Name", type: "text", name: "name" as const },
          { label: "Email", type: "email", name: "email" as const },
          { label: "SSC", type: "text", name: "ssc" as const },
          { label: "SSC Percentage", type: "text", name: "sscPercentage" as const },
          { label: "Inter", type: "text", name: "inter" as const },
          { label: "Inter Percentage", type: "text", name: "interPercentage" as const },
          { label: "Degree/Undergraduate", type: "text", name: "degree" as const },
          { label: "Degree Percentage", type: "text", name: "degreePercentage" as const },
          { label: "Your Resume Drive Link", type: "text", name: "resumeLink" as const },
        ].map(({ label, type, name }, index) => (
          <div className="flex flex-col" key={index}>
            <label className="block text-lg font-medium text-gray-700 mb-1" htmlFor={name}>
              {label}
            </label>
            <input
              type={type}
              id={name}
              {...register(name)}
              className={`mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out ${errors[name] ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors[name] && (
              <p className="text-red-500 text-sm mt-1">{errors[name]?.message}</p>
            )}
          </div>
        ))}

        <div className="flex flex-col">
          <label className="block text-lg font-medium text-gray-700 mb-1" htmlFor="profilePic">
            Your Picture
          </label>
          <input
            type="file"
            id="profilePic"
            accept="image/*"
            {...register("profilePic")}
            onChange={(e) => {
              handleFileChange(e);
              const file = e.target.files?.[0];
              if (file) {
                register("profilePic").onChange({ target: { files: [file] } });
              }
            }}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
          />
          {profilePicPreview && (
            <Image src={profilePicPreview} alt="Profile Preview" className="mt-2 h-32 w-32 object-cover rounded-md" width={128} height={128} />
          )}
        </div>

        <button
          type="submit"
          className="col-span-1 md:col-span-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Update Profile
        </button>
      </form>
    </div>
    <Footer />
    </>
  );
};

export default Profile;
