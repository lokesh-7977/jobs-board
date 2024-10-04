"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Footer from "@/components/custom/Footer";
import Navbar from "@/components/custom/Navbar";
import { useRouter } from "next/navigation";
import { Bar } from 'react-chartjs-2';
import { Card } from "@/components/ui/card"; 
import { Chart, registerables } from 'chart.js'; 
import React from "react";

Chart.register(...registerables); 

interface Job {
  id: number;
  title: string;
  description: string;
  location: string;
  salary?: number | null;
  employmentType?: string;
  jobLevel?: string;
  skills?: string | null;
  requirements?: string | null;
  keywords?: string | null;
}

const JobForm = ({ job, onSubmit, onReset }: {
  job: Job | null;
  onSubmit: (job: Job) => void;
  onReset: () => void;
}) => {
  const [formData, setFormData] = useState<Job>({
    id: job ? job.id : Date.now(),
    title: job?.title || "",
    description: job?.description || "",
    location: job?.location || "",
    salary: job?.salary || null,
    employmentType: job?.employmentType || "",
    jobLevel: job?.jobLevel || "",
    skills: job?.skills || "",
    requirements: job?.requirements || "",
    keywords: job?.keywords || ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...formData });
    onReset();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Job Title"
        className="w-full"
      />
      <Textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Job Description"
        className="w-full"
      />
      <Input
        type="text"
        name="location"
        value={formData.location}
        onChange={handleChange}
        placeholder="Location"
        className="w-full"
      />
      <Input
        type="number"
        name="salary"
        value={formData.salary || ""}
        onChange={handleChange}
        placeholder="Salary"
        className="w-full"
      />
      <Input
        type="text"
        name="employmentType"
        value={formData.employmentType}
        onChange={handleChange}
        placeholder="Employment Type"
        className="w-full"
      />
      <Input
        type="text"
        name="jobLevel"
        value={formData.jobLevel}
        onChange={handleChange}
        placeholder="Job Level"
        className="w-full"
      />
      <Input
        type="text"
        name="skills"
        value={formData.skills || ""}
        onChange={handleChange}
        placeholder="Skills"
        className="w-full"
      />
      <Textarea
        name="requirements"
        value={formData.requirements || ""}
        onChange={handleChange}
        placeholder="Requirements"
        className="w-full"
      />
      <Input
        type="text"
        name="keywords"
        value={formData.keywords || ""}
        onChange={handleChange}
        placeholder="Keywords"
        className="w-full"
      />
      <Button type="submit" className="bg-indigo-600 text-white">
        {job ? "Update Job" : "Post Job"}
      </Button>
    </form>
  );
};

const JobList = ({ jobs, onEdit, onDelete, onViewApplicants, onViewJobDetails }: {
  jobs: Job[];
  onEdit: (job: Job) => void;
  onDelete: (jobId: number) => void;
  onViewApplicants: (jobId: number) => void;
  onViewJobDetails: (jobId: number) => void;
}) => (
  <Card className="bg-white p-8 rounded-xl shadow-lg flex-1">
    <h1 className="text-2xl font-semibold text-indigo-600 mb-6">Job Listings</h1>
    {jobs.length === 0 ? (
      <p className="text-gray-500">No jobs found</p>
    ) : (
      <ul className="space-y-4">
        {jobs.map((job) => (
          <li key={job.id} className="border-b pb-4">
            <h3 className="text-xl font-semibold">{job.title}</h3>
            <p>{job.description}</p>
            <p className="text-gray-500">{job.location}</p>
            <p className="text-gray-500">Salary: {job.salary}</p>
            <div className="flex space-x-4 mt-2">
              <Button onClick={() => onEdit(job)} className="bg-yellow-600 text-white">Edit</Button>
              <Button onClick={() => onDelete(job.id)} className="bg-red-600 text-white">Delete</Button>
              <Button onClick={() => onViewApplicants(job.id)} className="bg-blue-600 text-white">View Applicants</Button>
              <Button onClick={() => onViewJobDetails(job.id)} className="bg-green-600 text-white">View Details</Button>
            </div>
          </li>
        ))}
      </ul>
    )}
  </Card>
);

const Dashboard = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedJobs = localStorage.getItem("jobs");
    if (storedJobs) {
      setJobs(JSON.parse(storedJobs));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  const handleJobSubmit = (newJob: Job) => {
    setJobs((prevJobs) => {
      if (editingJob) {
        return prevJobs.map((job) => (job.id === editingJob.id ? newJob : job));
      }
      return [...prevJobs, newJob];
    });
    setEditingJob(null);
  };

  const handleEdit = (job: Job) => {
    setEditingJob(job);
  };

  const handleDelete = (jobId: number) => {
    setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
  };

  const handleViewApplicants = (jobId: number) => {
    router.push(`/applicants/${jobId}`);
  };

  const handleViewJobDetails = (jobId: number) => {
    router.push(`/jobs/${jobId}`);
  };

  const resetForm = () => {
    setEditingJob(null);
  };

  const jobStats = {
    labels: jobs.map((job) => job.title),
    datasets: [
      {
        label: 'Salary',
        data: jobs.map((job) => job.salary || 0),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return (
    <>
      <Navbar />
      <div className="p-6 space-y-8 bg-gray-100 min-h-screen">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">HR Dashboard</h1>
        <div className="flex space-x-8">
          <div className="bg-white p-8 rounded-xl shadow-lg flex-1">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-6">
              {editingJob ? "Edit Job" : "Post a New Job"}
            </h2>
            <JobForm job={editingJob} onSubmit={handleJobSubmit} onReset={resetForm} />
          </div>

          <JobList 
            jobs={jobs} 
            onEdit={handleEdit} 
            onDelete={handleDelete} 
            onViewApplicants={handleViewApplicants} 
            onViewJobDetails={handleViewJobDetails} 
          />
        </div>

        <Card className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-6">Job Salary Chart</h2>
          <Bar data={jobStats} />
        </Card>

        <Footer />
      </div>
    </>
  );
};

export default Dashboard;
