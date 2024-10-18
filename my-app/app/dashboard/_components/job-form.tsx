"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast, Toaster } from 'react-hot-toast';
import { useSession } from "next-auth/react"; 

const jobSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  location: z.string().min(1, "Location is required"),
  salary: z.string().optional(),
  employmentType: z.string().min(1, "Employment type is required"),
  jobLevel: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  skills: z.union([z.string(), z.array(z.string())]).optional(),
  website: z.string().url("Invalid URL format").nullable().optional(),
  image: z.string().url("Invalid URL format").nullable().optional(),
  organization: z.string().min(1, "Organization name is required"), 
});

type Job = z.infer<typeof jobSchema>;

const employmentTypes = ["Full-time", "Part-time", "Contract", "Freelance"];
const jobLevels = ["Intern", "Junior", "Mid", "Senior", "Lead"];
const categories = ["Engineering", "Design", "Marketing", "Sales"];

const JobForm = ({ job, onSubmit, onReset }: { job: Job | null; onSubmit: (newJob: Job) => void; onReset: () => void; }) => {
  const { data: session } = useSession(); 
  const organizationName = session?.user?.name;

  const { register, handleSubmit, reset, formState: { errors } } = useForm<Job>({
    resolver: zodResolver(jobSchema),
    defaultValues: job || { organization: organizationName }, 
  });

  useEffect(() => {
    const initialValues = job 
      ? {
          ...job,
          skills: Array.isArray(job.skills) ? job.skills.join(", ") : job.skills || "",
        }
      : { organization: organizationName };

    reset(initialValues); 
  }, [job, reset, organizationName]);

  const handleFormSubmit = (data: Job) => {
    const skillsArray = typeof data.skills === 'string'
      ? data.skills.split(',').map(skill => skill.trim())
      : data.skills || [];

    const newJob = {
      ...data,
      skills: skillsArray,
      website: data.website || null,
    };

    onSubmit(newJob);
    reset(); 
    toast.success(job ? "Job updated successfully!" : "Job posted successfully!");
  };

  const handleReset = () => {
    reset({ organization: organizationName }); 
    onReset();
  };

  return (
    <>
      <Toaster />
      <form onSubmit={handleSubmit(handleFormSubmit)} className="mb-8 bg-white p-6 rounded-lg shadow-md space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="block text-sm font-medium text-gray-700">Company Name</Label>
            <Input
              type="text"
              {...register("name")}
              placeholder="Company Name"
              className={`mt-1 block w-full px-3 py-2 border ${errors.name ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-700">Job Title</Label>
            <Input
              type="text"
              {...register("title")}
              placeholder="Job Title"
              className={`mt-1 block w-full px-3 py-2 border ${errors.title ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm`}
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
          </div>
        </div>

        <div>
          <Label className="block text-sm font-medium text-gray-700">Description</Label>
          <textarea
            {...register("description")}
            placeholder="Job Description"
            className={`mt-1 block w-full h-24 px-3 py-2 border ${errors.description ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm`}
          />
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="block text-sm font-medium text-gray-700">Location</Label>
            <Input
              type="text"
              {...register("location")}
              placeholder="Location"
              className={`mt-1 block w-full px-3 py-2 border ${errors.location ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm`}
            />
            {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>}
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-700">Salary</Label>
            <Input
              type="text"
              {...register("salary")}
              placeholder="Salary (Optional)"
              className={`mt-1 block w-full px-3 py-2 border ${errors.salary ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm`}
            />
            {errors.salary && <p className="text-red-500 text-xs mt-1">{errors.salary.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="block text-sm font-medium text-gray-700">Employment Type</Label>
            <select
              {...register("employmentType")}
              className={`mt-1 block w-full px-3 py-2 border ${errors.employmentType ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm`}
            >
              <option value="">Select Employment Type</option>
              {employmentTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {errors.employmentType && <p className="text-red-500 text-xs mt-1">{errors.employmentType.message}</p>}
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-700">Job Level</Label>
            <select
              {...register("jobLevel")}
              className={`mt-1 block w-full px-3 py-2 border ${errors.jobLevel ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm`}
            >
              <option value="">Select Job Level</option>
              {jobLevels.map((level) => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
            {errors.jobLevel && <p className="text-red-500 text-xs mt-1">{errors.jobLevel.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="block text-sm font-medium text-gray-700">Category</Label>
            <select
              {...register("category")}
              className={`mt-1 block w-full px-3 py-2 border ${errors.category ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm`}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-700">Skills (comma separated)</Label>
            <Input
              type="text"
              {...register("skills")}
              placeholder="e.g. JavaScript, React, Node.js"
              className={`mt-1 block w-full px-3 py-2 border ${errors.skills ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm`}
            />
            {errors.skills && <p className="text-red-500 text-xs mt-1">{errors.skills.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="block text-sm font-medium text-gray-700">Website (Optional)</Label>
            <Input
              type="url"
              {...register("website")}
              placeholder="Company Website"
              className={`mt-1 block w-full px-3 py-2 border ${errors.website ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm`}
            />
            {errors.website && <p className="text-red-500 text-xs mt-1">{errors.website.message}</p>}
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-700">Image URL (Optional)</Label>
            <Input
              type="url"
              {...register("image")}
              placeholder="Image URL"
              className={`mt-1 block w-full px-3 py-2 border ${errors.image ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm`}
            />
            {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image.message}</p>}
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <Button type="button" onClick={handleReset} className="bg-gray-500 text-white">Reset</Button>
          <Button type="submit" className="bg-blue-600 text-white">{job ? "Update Job" : "Post Job"}</Button>
        </div>
      </form>
    </>
  );
};

export default JobForm;
