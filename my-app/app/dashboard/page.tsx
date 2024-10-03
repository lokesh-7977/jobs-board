// app/dashboard/page.jsx
"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Dashboard = () => {
  // State for managing form inputs and jobs
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [location, setLocation] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  interface Job {
    id: number;
    jobTitle: string;
    companyName: string;
    jobDescription: string;
    location: string;
    companyWebsite: string;
  }

  const [jobs, setJobs] = useState<Job[]>([]);
  const [editingJobId, setEditingJobId] = useState<number | null>(null);

  // Handle form submission for job posting and editing
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const newJob = {
      id: editingJobId || Date.now(), // Unique id based on time for simplicity
      jobTitle,
      companyName,
      jobDescription,
      location,
      companyWebsite,
    };

    // If editing, update the job; otherwise, add a new job
    if (editingJobId) {
      setJobs(jobs.map((job) => (job.id === editingJobId ? newJob : job)));
    } else {
      setJobs([...jobs, newJob]);
    }

    // Clear the form
    setJobTitle("");
    setCompanyName("");
    setJobDescription("");
    setLocation("");
    setCompanyWebsite("");
    setEditingJobId(null);
  };

  // Handle editing a job
  const handleEdit = (job: Job) => {
    setJobTitle(job.jobTitle);
    setCompanyName(job.companyName);
    setJobDescription(job.jobDescription);
    setLocation(job.location);
    setCompanyWebsite(job.companyWebsite);
    setEditingJobId(job.id);
  };

  // Handle deleting a job
  const handleDelete = (jobId: number) => {
    setJobs(jobs.filter((job) => job.id !== jobId));
  };

  // View applicants (dummy function for demo purposes)
  const handleViewApplicants = (jobId: number) => {
    alert(`View applicants for job ID: ${jobId}`);
  };

  return (
    <div className="p-6 space-y-8 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">HR Dashboard</h1>

      {/* Job Posting Form */}
      <div className="bg-white p-8 rounded-xl shadow-lg">
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
          <Input
            placeholder="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
            className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <Textarea
            placeholder="Job Description"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            required
            rows={4}
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
            type="url"
            placeholder="Company Website"
            value={companyWebsite}
            onChange={(e) => setCompanyWebsite(e.target.value)}
            className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <Button
            type="submit"
            className="w-full bg-indigo-600 text-white hover:bg-indigo-700"
          >
            {editingJobId ? "Update Job" : "Post Job"}
          </Button>
        </form>
      </div>

      {/* Job Listings */}
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-indigo-600 mb-6">
          Posted Jobs
        </h2>
        {jobs.length === 0 ? (
          <p className="text-gray-500">No jobs posted yet.</p>
        ) : (
          <div className="space-y-6">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="p-6 border border-gray-200 rounded-lg bg-gray-50 flex justify-between items-center"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {job.jobTitle}
                  </h3>
                  <p className="text-gray-600">{job.companyName}</p>
                  <p className="text-gray-500">{job.location}</p>
                  <a
                    href={job.companyWebsite}
                    className="text-sm text-indigo-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {job.companyWebsite}
                  </a>
                </div>
                <div className="space-x-3">
                  <Button
                    onClick={() => handleEdit(job)}
                    className="bg-yellow-500 text-white hover:bg-yellow-600"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(job.id)}
                    className="bg-red-600 text-white hover:bg-red-700"
                  >
                    Delete
                  </Button>
                  <Button
                    onClick={() => handleViewApplicants(job.id)}
                    className="bg-blue-500 text-white hover:bg-blue-600"
                  >
                    View Applicants
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
