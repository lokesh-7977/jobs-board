"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast, Toaster } from 'react-hot-toast';

const jobSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  location: z.string().min(1, "Location is required"),
  salary: z.string().optional(),
  employmentType: z.string().min(1, "Employment type is required"),
  jobLevel: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  skills: z.union([z.string(), z.array(z.string())]).optional(),
  website: z.string().url("Invalid URL format").nullable().optional(),
});

type Job = z.infer<typeof jobSchema>;

const employmentTypes = ["Full-time", "Part-time", "Contract", "Freelance"];
const jobLevels = ["Intern", "Junior", "Mid", "Senior", "Lead"];
const categories = ["Engineering", "Design", "Marketing", "Sales"];

const JobForm = ({ job, onSubmit, onReset }: { job: Job | null; onSubmit: (newJob: Job) => void; onReset: () => void; }) => {
  const [shouldReset, setShouldReset] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Job>({
    resolver: zodResolver(jobSchema),
    defaultValues: job || {},
  });

  useEffect(() => {
    reset(job || {});
  }, [job, reset, shouldReset]);

  const handleFormSubmit = (data: Job) => {
    const skillsArray = typeof data.skills === 'string'
      ? data.skills.split(',').map((skill: string) => skill.trim())
      : data.skills || [];

    const newJob = {
      ...data,
      skills: skillsArray,
      website: data.website || null
    };

    onSubmit(newJob);
    reset();
    toast.success(job ? "Job updated successfully!" : "Job posted successfully!");
  };

  const handleReset = () => {
    setShouldReset(true);
    onReset();
  };

  return (
    <>
      <Toaster />
      <form onSubmit={handleSubmit(handleFormSubmit)} className="mb-8 bg-white p-6 rounded-lg shadow-md space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="block text-sm font-medium text-gray-700">Job Title</Label>
            <Input
              type="text"
              {...register("title")}
              placeholder="Job Title"
              className={`mt-1 block w-full px-3 py-2 border ${errors.title ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-700">Job Description</Label>
            <textarea
              {...register("description")}
              placeholder="Job Description"
              className={`mt-1 block w-full px-3 py-2 border ${errors.description ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-700">Location</Label>
            <Input
              type="text"
              {...register("location")}
              placeholder="Location"
              className={`mt-1 block w-full px-3 py-2 border ${errors.location ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            />
            {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>}
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-700">Employment Type</Label>
            <select
              {...register("employmentType")}
              className={`mt-1 block w-full px-3 py-2 border ${errors.employmentType ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            >
              <option value="">Select Employment Type</option>
              {employmentTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {errors.employmentType && <p className="text-red-500 text-xs mt-1">{errors.employmentType.message}</p>}
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-700">Job Level</Label>
            <select
              {...register("jobLevel")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select Job Level</option>
              {jobLevels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-700">Skills (comma-separated)</Label>
            <Input
              type="text"
              {...register("skills")}
              placeholder="e.g. JavaScript, React"
              className={`mt-1 block w-full px-3 py-2 border ${errors.skills ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            />
            {errors.skills && <p className="text-red-500 text-xs mt-1">{errors.skills.message}</p>}
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-700">Category</Label>
            <select
              {...register("category")}
              className={`mt-1 block w-full px-3 py-2 border ${errors.category ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            >
              <option value="">Select Category</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-700">Website{" "}(Optional)</Label>
            <Input
              type="text"
              {...register("website")}
              placeholder="Job Website URL"
              className={`mt-1 block w-full px-3 py-2 border ${errors.website ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            />
            {errors.website && <p className="text-red-500 text-xs mt-1">{errors.website.message}</p>}
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-700">Salary</Label>
            <Input
              type="number"
              {...register("salary")}
              placeholder="Salary"
              className={`mt-1 block w-full px-3 py-2 border ${errors.salary ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            />
            {errors.salary && <p className="text-red-500 text-xs mt-1">{errors.salary.message}</p>}
          </div>

          <div className="flex justify-end space-x-4 mt-4">
            <Button type="submit" className="bg-blue-600 w-44">{job ? "Update Job" : "Post Job"}</Button>
            <Button type="button" onClick={handleReset} variant="outline">Reset</Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default JobForm;
