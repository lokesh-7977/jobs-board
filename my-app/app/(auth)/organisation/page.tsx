"use client";

import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

const organizationSchema = z.object({
  name: z.string().nonempty({ message: "Organization Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phoneNumber: z.string().nonempty({ message: "Phone Number is required" }),
  totalEmployee: z
    .string()
    .min(1, { message: "Total employees must be at least 1" }),
  industryType: z.string().nonempty({ message: "Industry Type is required" }),
  city: z.string().nonempty({ message: "City is required" }),
  address: z.string().nonempty({ message: "Address is required" }),
  description: z.string().nonempty({ message: "Description is required" }),
  logo: z.string().nonempty({ message: "Logo must be a valid URL" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

type OrganizationFormData = z.infer<typeof organizationSchema>;

const Organization = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<OrganizationFormData>({
    resolver: zodResolver(organizationSchema),
  });

  const onSubmit = async (data: OrganizationFormData) => {
    const submittedData = {
      ...data,
      createdDate: new Date().toISOString().split("T")[0],
      totalEmployee: Number(data.totalEmployee),
      role: "employer",
    };

    try {
      const response = await axios.post("/api/auth/register", submittedData);
      if (response.status === 200 || response.status === 201) {
        toast.success("Organization registered successfully!");
        reset();
        router.push("/login");
      } else {
        toast.error("Failed to register the organization.");
      }
    } catch (error) {
      console.error(error); 
      if (axios.isAxiosError(error) && error.response) {
        toast.error(
          `Error: ${error.response.data.error || "An error occurred"}`
        );
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <>
    <Toaster />
    <div className="bg-gray-50 px-8 py-12">
      <h1 className="text-center text-3xl font-bold text-indigo-600 mb-8">
        Recruit Better With Careers Connect
      </h1>

      <div className="bg-white shadow-md rounded-lg p-8 max-w-2xl mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="name">Organization Name</Label>
              <Input id="name" {...register("name")} />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="email">Organization Email</Label>
              <Input id="email" type="email" {...register("email")} />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input id="phoneNumber" type="tel" {...register("phoneNumber")} />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="totalEmployee">Total Employees</Label>
              <Input
                id="totalEmployee"
                type="number"
                {...register("totalEmployee")}
              />
              {errors.totalEmployee && (
                <p className="text-red-500 text-sm">
                  {errors.totalEmployee.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="industryType">Industry Type</Label>
              <Input id="industryType" {...register("industryType")} />
              {errors.industryType && (
                <p className="text-red-500 text-sm">
                  {errors.industryType.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="city">City</Label>
              <Input id="city" {...register("city")} />
              {errors.city && (
                <p className="text-red-500 text-sm">{errors.city.message}</p>
              )}
            </div>
          </div>

          <div className="mt-6">
            <Label htmlFor="address">Address</Label>
            <Input id="address" {...register("address")} />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address.message}</p>
            )}
          </div>

          <div className="mt-6 flex flex-col md:flex-row gap-4">
            <div className="w-full">
              <Label htmlFor="logo">Logo URL</Label>
              <Input id="logo" {...register("logo")} />
              {errors.logo && (
                <p className="text-red-500 text-sm">{errors.logo.message}</p>
              )}
            </div>

            <div className="w-full">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
                >
                  {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </span>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <div className="mt-6">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              {...register("description")}
              className="w-full rounded-md border-2 border-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              rows={4}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="mt-8">
            <Button
              type="submit"
              className="bg-indigo-600 w-full text-white hover:bg-indigo-700"
            >
              Register Organization
            </Button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default Organization;
