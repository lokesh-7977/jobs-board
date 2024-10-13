/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "@/components/custom/Navbar";
import Footer from "@/components/custom/Footer";
import { useSession } from "next-auth/react";

const schema = z.object({
  name: z.string().nonempty("Name is required"),
  email: z.string().email("Invalid email address"),
  city: z.string().optional(),
  ssc: z.string().nonempty("SSC is required"),
  sscper: z.string().nonempty("SSC Percentage is required"),
  inter: z.string().nonempty("Inter is required"),
  interper: z.string().nonempty("Inter Percentage is required"),
  degree: z.string().nonempty("Degree is required"),
  degreeper: z.string().nonempty("Degree Percentage is required"),
  resume: z.string().url("Invalid URL").nonempty("Resume link is required"),
  verifyEmail: z.boolean().optional(),
  role: z.string().optional(),
});

type ProfileFormData = z.infer<typeof schema>;

const Profile = () => {
  const { data: session } = useSession();
  const [userData, setUserData] = useState<ProfileFormData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // Loading state

  const {
    register,
    handleSubmit,
    setValue,
    reset, // Added reset for form
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(schema),
  });

  const fetchUserData = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axios.get("/api/auth/get-all-users");
      const data = response.data;
  
      if (data && data.length > 0) {
        const user = data[0];
        setUserData(user);
        
        // Set default values for each field or use the user data
        const defaultValues: ProfileFormData = {
          name: user.name || "N/A",
          email: user.email || "N/A",
          city: user.city || "N/A",
          ssc: user.ssc || "N/A",
          sscper: user.sscper || "N/A",
          inter: user.inter || "N/A",
          interper: user.interper || "N/A",
          degree: user.degree || "N/A",
          degreeper: user.degreeper || "N/A",
          resume: user.resume || "N/A",
          verifyEmail: user.verifyEmail || false, // Assume default is false
          role: user.role || "N/A",
        };
  
        for (const key in defaultValues) {
          setValue(key as keyof ProfileFormData, defaultValues[key as keyof ProfileFormData]);
        }
      } else {
        setErrorMessage("No user data found.");
        // Set default values if no user data is found
        reset({
          name: "N/A",
          email: "N/A",
          city: "N/A",
          ssc: "N/A",
          sscper: "N/A",
          inter: "N/A",
          interper: "N/A",
          degree: "N/A",
          degreeper: "N/A",
          resume: "N/A",
          verifyEmail: false,
          role: "N/A",
        });
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      setErrorMessage("Failed to fetch user data. Please try again later.");
    } finally {
      setLoading(false); // End loading
    }
  };
  
  useEffect(() => {
    fetchUserData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setValue]);

  const onSubmit = async (data: ProfileFormData) => {
    setLoading(true); // Start loading
    try {
      const updatedData = {
        ...data,
        sessionId: session?.user?.id,
      };

      const response = await axios.post(`/api/auth/get-all-users`, updatedData);

      if (response.status === 200) {
        toast.success("Profile updated successfully");
        fetchUserData(); // Refresh user data after update
        reset(); // Reset form after successful update
      } else {
        setErrorMessage("Failed to update user data. Please try again.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setErrorMessage("Error updating profile. Please try again later.");
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <>
      <Toaster />
      <Navbar />
      <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">My Profile</h1>
        {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>} 
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Form fields */}
          {["name", "email", "city", "ssc", "sscper", "inter", "interper", "degree", "degreeper", "resume"].map((field) => (
            <div key={field} className="flex flex-col">
              <label className="block text-lg font-medium text-gray-700 mb-1" htmlFor={field}>
                {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
              </label>
              <input
                type={field === "email" ? "email" : "text"}
                id={field}
                {...register(field as keyof ProfileFormData)}
                className={`mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 ${field === "name" || field === "email" ? "bg-gray-200" : ""}`}
                disabled={field === "name" || field === "email"}
              />
            </div>
          ))}
          {/* Submit Button */}
          <div className="col-span-2 flex justify-center">
            <button
              type="submit"
              disabled={loading} // Disable button when loading
              className={`mt-4 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-white ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
