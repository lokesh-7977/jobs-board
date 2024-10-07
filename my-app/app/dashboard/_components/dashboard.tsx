"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import JobForm from "./job-form";
import JobList from "./job-list";
import { useUserContext } from "@/app/context/AuthContext";
import Footer from "@/components/custom/Footer";
import Navbar from "@/components/custom/Navbar";

type Job = {
  id?: string;
  title: string;
  description: string;
  location: string;
  salary?: number | null;
  employmentType?: string | undefined;
  jobLevel?: string;
  skills?: string;
};

const fetchJobs = async (userId: string) => {
  const response = await axios.get(`/api/jobs/get-jobs?userId=${userId}`);
  return response.data.jobs || [];
};

const addJob = async (job: Job, userId: string) => {
  const response = await axios.post(`/api/jobs?userId=${userId}`, { ...job, userId });
  return response.data;
};

const updateJob = async (job: Job, userId: string) => {
  const response = await axios.put(`/api/jobs?id=${job.id}`, {
    ...job,
    userId,
  });
  return response.data;
};

const deleteJob = async (jobId: string) => {
  await axios.delete(`/api/jobs?id=${jobId}`);
};

const Dashboard = () => {
  const { userId } = useUserContext() || {};
  const [jobs, setJobs] = useState<Job[]>([]);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadJobs = async () => {
      if (!userId) return;
      setLoading(true);
      try {
        const fetchedJobs = await fetchJobs(userId);
        setJobs(fetchedJobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    loadJobs();
  }, [userId]);

  const handleAddOrUpdateJob = async (job: Job) => {
    if (!userId) return;
    setLoading(true);
    try {
      const savedJob = editingJob
        ? await updateJob(job, userId)
        : await addJob(job, userId);
      setJobs((prevJobs) =>
        editingJob
          ? prevJobs.map((j) => (j.id === savedJob.id ? savedJob : j))
          : [...prevJobs, savedJob]
      );
      setEditingJob(null);
    } catch (error) {
      console.error("Error saving job:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditJob = (job: Job) => {
    setEditingJob({ ...job });
  };

  const handleDeleteJob = async (jobId: string) => {
    setLoading(true);
    try {
      await deleteJob(jobId);
      setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
    } catch (error) {
      console.error("Error deleting job:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResetForm = () => {
    setEditingJob(null);
  };

  const handleViewJob = (job: Job) => {
    console.log("Viewing job:", job);
  };

  const handleViewApplicants = (jobId: string) => {
    console.log("Viewing applicants for job ID:", jobId);
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-1/2 bg-gray-100 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Add / Edit Job</h2>
            <JobForm
              job={
                editingJob
                  ? {
                      ...editingJob,
                      employmentType: editingJob.employmentType || "",
                    }
                  : null
              }
              onSubmit={handleAddOrUpdateJob}
              onReset={handleResetForm}
            />
          </div>
          ]{" "}
          <div className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow-lg">
            {loading ? (
              <p>Loading jobs...</p>
            ) : (
              <JobList
                jobs={jobs}
                onEdit={handleEditJob}
                onDelete={handleDeleteJob}
                onView={handleViewJob}
                onViewApplicants={handleViewApplicants}
              />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
