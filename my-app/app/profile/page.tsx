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

// Validation schema for the form using Zod
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

// Type for the form data inferred from the schema
type ProfileFormData = z.infer<typeof schema>;

const Profile = () => {
  const { data: session } = useSession();
  const [userData, setUserData] = useState<ProfileFormData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(schema),
  });

  // Fetch user data and set default form values
  const fetchUserData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/auth/get-all-users/post");
      const data = response.data;

      if (data && data.length > 0) {
        const user = data[0];
        setUserData(user);

        const defaultValues: ProfileFormData = {
          name: user.name || "",
          email: user.email || "",
          city: user.city || "",
          ssc: user.ssc || "",
          sscper: user.sscper || "",
          inter: user.inter || "",
          interper: user.interper || "",
          degree: user.degree || "",
          degreeper: user.degreeper || "",
          resume: user.resume || "",
          verifyEmail: user.verifyEmail || false,
          role: user.role || "",
        };

        reset(defaultValues); 
      } else {
        setErrorMessage("No user data found.");
        reset({
          name: "",
          email: "",
          city: "",
          ssc: "",
          sscper: "",
          inter: "",
          interper: "",
          degree: "",
          degreeper: "",
          resume: "",
          verifyEmail: false,
          role: "",
        });
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      setErrorMessage("Failed to fetch user data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch user data on mount
  useEffect(() => {
    fetchUserData();
  }, []);

  // Handle form submission
  const onSubmit = async (data: ProfileFormData) => {
    setLoading(true);
    try {
      const updatedData = {
        ...data,
        sessionId: session?.user?.id,
      };

      const response = await axios.post(`/api/auth/get-all-users/post`, updatedData);

      if (response.status === 200) {
        toast.success("Profile updated successfully");
        setUserData(updatedData); // Update local state with the updated data
        reset(updatedData); // Reset form with the updated data
      } else {
        setErrorMessage("Failed to update user data. Please try again.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setErrorMessage("Error updating profile. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      <Navbar />
      <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">My Profile</h1>

        {errorMessage && (
          <p className="text-red-500 text-center mb-4">{errorMessage}</p>
        )}

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
                className={`mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 ${
                  errors[field as keyof ProfileFormData] ? "border-red-500" : ""
                }`}
                disabled={field === "name" || field === "email"} // Disable name and email fields
                aria-invalid={errors[field as keyof ProfileFormData] ? "true" : "false"}
              />
              {errors[field as keyof ProfileFormData] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[field as keyof ProfileFormData]?.message}
                </p>
              )}
            </div>
          ))}

          {/* Submit Button */}
          <div className="col-span-2 flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className={`mt-4 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-white ${
                loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
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
