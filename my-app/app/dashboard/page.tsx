"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Footer from "@/components/custom/Footer";
import Navbar from "@/components/custom/Navbar";
import { useRouter } from "next/navigation";
import React from "react";

const Dashboard = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState<number | null>(null);
  const [employmentType, setEmploymentType] = useState("");
  const [jobLevel, setJobLevel] = useState("");
  const [skills, setSkills] = useState<string | null>(null);
  const [requirements, setRequirements] = useState<string | null>(null);
  const [keywords, setKeywords] = useState<string | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [editingJobId, setEditingJobId] = useState<number | null>(null);

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

  const router = useRouter();

  useEffect(() => {
    // Load jobs from local storage on component mount
    const storedJobs = localStorage.getItem("jobs");
    if (storedJobs) {
      setJobs(JSON.parse(storedJobs));
    }
  }, []);

  useEffect(() => {
    // Update local storage whenever jobs change
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newJob = {
      id: editingJobId !== null ? editingJobId : Date.now(),
      title: jobTitle,
      description: jobDescription,
      location,
      salary,
      employmentType,
      jobLevel,
      skills,
      requirements,
      keywords,
    };

    if (editingJobId) {
      setJobs((prevJobs) =>
        prevJobs.map((job) => (job.id === editingJobId ? newJob : job))
      );
    } else {
      setJobs((prevJobs) => [...prevJobs, newJob]);
    }

    resetForm();
  };

  const resetForm = () => {
    setJobTitle("");
    setJobDescription("");
    setLocation("");
    setSalary(null);
    setEmploymentType("");
    setJobLevel("");
    setSkills(null);
    setRequirements(null);
    setKeywords(null);
    setEditingJobId(null);
  };

  const handleEdit = (job: Job) => {
    setJobTitle(job.title);
    setJobDescription(job.description);
    setLocation(job.location);
    setSalary(job.salary || null);
    setEmploymentType(job.employmentType || "");
    setJobLevel(job.jobLevel || "");
    setSkills(job.skills || null);
    setRequirements(job.requirements || null);
    setKeywords(job.keywords || null);
    setEditingJobId(job.id);
  };

  const handleDelete = (jobId: number) => {
    setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
  };

  const handleViewApplicants = (jobId: number) => {
    router.push(`/applicants/${jobId}`); // Navigate to the applicants page for the job
  };

  const handleViewJobDetails = (jobId: number) => {
    router.push(`/jobs/${jobId}`); // Navigate to the job details page
  };

  return (
    <>
      <Navbar />
      <div className="p-6 space-y-8 bg-gray-100 min-h-screen">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">HR Dashboard</h1>

        <div className="flex space-x-8">
          <div className="bg-white p-8 rounded-xl shadow-lg flex-1">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-6">
              {editingJobId ? "Edit Job" : "Post a New Job"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                placeholder="Job Title"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                required
                className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <Textarea
                placeholder="Job Description"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                required
                className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <Input
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <Input
                placeholder="Salary"
                type="number"
                value={salary || ""}
                onChange={(e) => setSalary(e.target.value ? Number(e.target.value) : null)}
                className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <Input
                placeholder="Employment Type"
                value={employmentType}
                onChange={(e) => setEmploymentType(e.target.value)}
                required
                className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <Input
                placeholder="Job Level"
                value={jobLevel}
                onChange={(e) => setJobLevel(e.target.value)}
                required
                className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <Input
                placeholder="Skills (comma-separated)"
                value={skills || ""}
                onChange={(e) => setSkills(e.target.value || null)}
                className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <Input
                placeholder="Requirements"
                value={requirements || ""}
                onChange={(e) => setRequirements(e.target.value || null)}
                className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <Input
                placeholder="Keywords (comma-separated)"
                value={keywords || ""}
                onChange={(e) => setKeywords(e.target.value || null)}
                className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <Button type="submit" className="bg-indigo-600 text-white">
                {editingJobId ? "Update Job" : "Post Job"}
              </Button>
            </form>
          </div>

          {/* Job Listings */}
          <div className="bg-white p-8 rounded-xl shadow-lg flex-1">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-6">Job Listings</h2>
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
                      <Button onClick={() => handleEdit(job)} className="bg-yellow-600 text-white">
                        Edit
                      </Button>
                      <Button onClick={() => handleDelete(job.id)} className="bg-red-600 text-white">
                        Delete
                      </Button>
                      <Button onClick={() => handleViewApplicants(job.id)} className="bg-blue-600 text-white">
                        View Applicants
                      </Button>
                      <Button onClick={() => handleViewJobDetails(job.id)} className="bg-green-600 text-white">
                        View Details
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
