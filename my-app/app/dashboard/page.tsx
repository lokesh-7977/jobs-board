/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useUserContext } from '@/app/context/AuthContext'; 
import Footer from "@/components/custom/Footer";
import Navbar from "@/components/custom/Navbar";
import { useRouter } from "next/navigation";
import React from "react";

interface Job {
  id: number;
  title: string;
  description: string;
  location: string;
  salary?: number | null;
  employmentType?: string;
  jobLevel?: string;
  skills?: string[]; 
}

const JobForm = ({ job, onSubmit, onReset }: { job: Job | null; onSubmit: (newJob: Job) => void; onReset: () => void; userId: string; }) => {
  const [title, setTitle] = useState(job?.title || '');
  const [description, setDescription] = useState(job?.description || '');
  const [location, setLocation] = useState(job?.location || '');
  const [salary, setSalary] = useState<number | null>(job?.salary || null);
  const [employmentType, setEmploymentType] = useState(job?.employmentType || '');
  const [jobLevel, setJobLevel] = useState(job?.jobLevel || '');
  const [skills, setSkills] = useState(job?.skills?.join(', ') ?? ''); // Join array to string for input

  useEffect(() => {
    if (job) {
      setTitle(job.title);
      setDescription(job.description);
      setLocation(job.location);
      setSalary(job.salary ?? null);
      setEmploymentType(job.employmentType ?? '');
      setJobLevel(job.jobLevel ?? '');
      setSkills(job.skills?.join(', ') ?? ''); 
    } else {
      setTitle('');
      setDescription('');
      setLocation('');
      setSalary(null);
      setEmploymentType('');
      setJobLevel('');
      setSkills('');
    }
  }, [job]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newJob: Job = {
      id: job ? job.id : Date.now(),
      title,
      description,
      location,
      salary,
      employmentType,
      jobLevel,
      skills: skills.split(',').map(skill => skill.trim()), 
    };
    onSubmit(newJob);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Job Title"
        required
        className="block w-full mb-2 p-2 border border-gray-300 rounded"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Job Description"
        required
        className="block w-full mb-2 p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Location"
        required
        className="block w-full mb-2 p-2 border border-gray-300 rounded"
      />
      <input
        type="number"
        value={salary !== null ? salary : ''} 
        onChange={(e) => setSalary(e.target.value ? +e.target.value : null)}
        placeholder="Salary"
        className="block w-full mb-2 p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        value={employmentType}
        onChange={(e) => setEmploymentType(e.target.value)}
        placeholder="Employment Type"
        className="block w-full mb-2 p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        value={jobLevel}
        onChange={(e) => setJobLevel(e.target.value)}
        placeholder="Job Level"
        className="block w-full mb-2 p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
        placeholder="Skills (comma separated)"
        className="block w-full mb-2 p-2 border border-gray-300 rounded"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        {job ? "Update Job" : "Add Job"}
      </button>
      <button type="button" onClick={onReset} className="ml-2 bg-gray-300 text-black px-4 py-2 rounded">
        Reset
      </button>
    </form>
  );
};

const JobList = ({ jobs, onEdit, onDelete, onViewApplicants, onViewJobDetails }: { jobs: Job[]; onEdit: (job: Job) => void; onDelete: (jobId: number) => void; onViewApplicants: (jobId: any) => void; onViewJobDetails: (jobId: any) => void; }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Job Listings</h2>
      <ul>
        {jobs.map((job) => (
          <li key={job.id} className="border-b py-2 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold">{job.title}</h3>
              <p>{job.description}</p>
              <p>{job.location}</p>
            </div>
            <div>
              <button onClick={() => onEdit(job)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Edit</button>
              <button onClick={() => onDelete(job.id)} className="bg-red-500 text-white px-2 py-1 rounded mr-2">Delete</button>
              <button onClick={() => onViewJobDetails(job.id)} className="bg-green-500 text-white px-2 py-1 rounded mr-2">View Details</button>
              <button onClick={() => onViewApplicants(job.id)} className="bg-blue-500 text-white px-2 py-1 rounded">View Applicants</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Dashboard = () => {
  const { userId } = useUserContext() || {}; 
  const [jobs, setJobs] = useState<Job[]>([]);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchJobs = async () => {
      if (!userId) {
        return;
      }

      setLoading(true); 
      try {
        const response = await fetch(`/api/jobs?userId=${userId}`); 
        if (!response.ok) throw new Error('Failed to fetch jobs');
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchJobs();
  }, [userId]); 

  const handleJobSubmit = async (newJob: Job) => {
    try {
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newJob),
      });

      if (!response.ok) throw new Error('Failed to save job');

      const savedJob = await response.json();

      setJobs((prevJobs) => [...prevJobs, savedJob]);
    } catch (error) {
      console.error('Failed to save job:', error);
    }
    setEditingJob(null);
  };

  const handleEdit = (job: Job) => {
    setEditingJob(job);
  };

  const handleDelete = async (jobId: number) => {
    try {
      await fetch(`/api/jobs?id=${jobId}`, {
        method: 'DELETE',
      });

      setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
    } catch (error) {
      console.error('Failed to delete job:', error);
    }
  };

  const handleResetForm = () => {
    setEditingJob(null);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

        {loading ? (
          <p>Loading jobs...</p>
        ) : (
          <>
            <JobForm
              job={editingJob}
              onSubmit={handleJobSubmit}
              onReset={handleResetForm}
              userId={userId!}
            />
            <JobList
              jobs={jobs}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onViewApplicants={(jobId) => router.push(`/applicants/${jobId}`)}
              onViewJobDetails={(jobId) => router.push(`/jobs/${jobId}`)} 
            />
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;


