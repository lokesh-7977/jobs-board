import { useEffect } from "react";
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
  salary: z.number().nullable().optional(),
  employmentType: z.string().min(1, "Employment type is required"),
  jobLevel: z.string().optional(),
  skills: z.string().optional(),
});

type Job = z.infer<typeof jobSchema>;

const JobForm = ({
  job,
  onSubmit,
  onReset,
}: {
  job: Job | null;
  onSubmit: (newJob: Job) => void;
  onReset: () => void;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Job>({
    resolver: zodResolver(jobSchema),
    defaultValues: job || {},
  });

  useEffect(() => {
    reset(job || {});
  }, [job, reset]);

  const handleFormSubmit = (data: Job) => {
    onSubmit(data); 

    toast.success(job ? "Job updated successfully!" : "Job posted successfully!");
  };

  return (
    <>
    <Toaster />
    <form
      onSubmit={handleSubmit(handleFormSubmit)} 
      className="mb-8 bg-white p-6 rounded-lg shadow-md space-y-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Job Title</label>
          <Input
            type="text"
            {...register("title")}
            placeholder="Job Title"
            className={`mt-1 block w-full px-3 py-2 border ${
              errors.title ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
          />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
        </div>

        <div>
          <Label className="block text-sm font-medium text-gray-700">Job Description</Label>
          <textarea
            {...register("description")}
            placeholder="Job Description"
            className={`mt-1 block w-full px-3 py-2 border ${
              errors.description ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
          />
          {errors.description && (
            <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <Input
            type="text"
            {...register("location")}
            placeholder="Location"
            className={`mt-1 block w-full px-3 py-2 border ${
              errors.location ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
          />
          {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Salary</label>
          <Input
            type="number"
            {...register("salary", { valueAsNumber: true })}
            placeholder="Salary"
            className={`mt-1 block w-full px-3 py-2 border ${
              errors.salary ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Employment Type</label>
          <select
            {...register("employmentType")}
            className={`mt-1 block w-full px-3 py-2 border ${
              errors.employmentType ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
          >
            <option value="">Select employment type</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
          {errors.employmentType && (
            <p className="text-red-500 text-xs mt-1">{errors.employmentType.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Job Level</label>
          <Input
            type="text"
            {...register("jobLevel")}
            placeholder="Job Level (e.g., Entry, Mid, Senior)"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Skills</label>
          <Input
            type="text"
            {...register("skills")}
            placeholder="Skills (comma separated)"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="flex space-x-3 mt-4">
        <Button
          className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700"
        >
          {job ? "Update Job" : "Add Job"}
        </Button>
        <Button
          onClick={onReset}
          className="bg-gray-300 text-black px-4 py-2 rounded-md shadow-sm hover:bg-gray-400"
        >
          Reset
        </Button>
      </div>
    </form>
    </>
  );
};

export default JobForm;
