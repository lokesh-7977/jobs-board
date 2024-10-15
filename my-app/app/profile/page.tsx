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
import { FaSpinner, FaCheckCircle } from "react-icons/fa"; // For loading spinner
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
  const [loading, setLoading] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false); // State to track editing
  const [updatedSuccess, setUpdatedSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(schema),
  });

  const fetchUserData = async () => {
    setLoading(true);
    try {
      if (session?.user?.email) {
        const response = await axios.get("/api/auth/get-all-users");
        const data = response.data;
        if (data && data.length > 0) {
          const user = data.find((u: { email: string }) => u.email === session.user?.email);
          if (user) {
            const defaultValues: ProfileFormData = {
              name: session.user?.name || user.name || "",
              email: session.user?.email || user.email || "",
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
            setUserData(defaultValues);
            reset(defaultValues);
          } else {
            setErrorMessage("No matching user data found.");
          }
        } else {
          setErrorMessage("No user data found.");
        }
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      setErrorMessage("Failed to fetch user data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [session]);

  const onSubmit = async (data: ProfileFormData) => {
    setLoading(true);
    try {
      const updatedData = {
        ...data,
        sessionId: session?.user?.id,
      };

      const response = await axios.post(`/api/auth/get-all-users/post`, updatedData);

      if (response.status === 200) {
        setUpdatedSuccess(true);
        toast.success("Profile updated successfully");
        setUserData(updatedData);
        reset(updatedData);
      } else {
        setErrorMessage("Failed to update user data. Please try again.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setErrorMessage("Error updating profile. Please try again later.");
    } finally {
      setLoading(false);
      setTimeout(() => setUpdatedSuccess(false), 3000); // Hide success indicator after 3s
    }
  };

  return (
    <>
      <Toaster />
      <Navbar />
      <div className="container mx-auto bg-white shadow-lg rounded-lg -mt-1">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">My Profile</h1>

        {errorMessage && (
          <p className="text-red-500 text-center mb-4">{errorMessage}</p>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {["name", "email", "city", "ssc", "sscper", "inter", "interper", "degree", "degreeper", "resume"].map((field) => (
            <div key={field} className="flex flex-col">
              <label
                className="block text-lg font-semibold text-gray-700 mb-2"
                htmlFor={field}
              >
                {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, " $1")}
              </label>
              <Input
                id={field}
                type={field === "email" ? "email" : "text"}
                {...register(field as keyof ProfileFormData)}
                disabled={!isEditing || field === "name" || field === "email"} // Disable if not editing
                className={`mt-1 block w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                  errors[field as keyof ProfileFormData] ? "border-red-500" : ""
                }`}
                aria-invalid={errors[field as keyof ProfileFormData] ? "true" : "false"}
              />
              {errors[field as keyof ProfileFormData] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[field as keyof ProfileFormData]?.message}
                </p>
              )}
            </div>
          ))}

          <div className="col-span-2 flex justify-center">
            {isEditing ? (
              <>
                <Button
                  type="submit"
                  className={`mt-2 inline-flex items-center justify-center px-8 py-3 text-lg font-medium transition-all shadow-lg bg-blue-600 hover:bg-blue-700 text-white rounded-lg ${
                    loading || updatedSuccess ? "cursor-not-allowed" : ""
                  }`}
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <FaSpinner className="animate-spin" />
                      <span>Updating...</span>
                    </div>
                  ) : updatedSuccess ? (
                    <div className="flex items-center space-x-2 text-green-600">
                      <FaCheckCircle />
                      <span>Profile Updated!</span>
                    </div>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
                <Button
                  type="button"
                  className="mt-2 ml-4 inline-flex items-center justify-center px-8 py-3 text-lg font-medium transition-all shadow-lg bg-gray-300 hover:bg-gray-400 text-black rounded-lg"
                  onClick={() => setIsEditing(false)} // Cancel editing
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                type="button"
                className="mt-6 inline-flex items-center justify-center px-8 py-3 text-lg font-medium transition-all shadow-lg bg-green-600 hover:bg-green-700 text-white rounded-lg"
                onClick={() => setIsEditing(true)} // Enable editing
              >
                Edit Profile
              </Button>
            )}
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
