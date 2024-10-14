/* eslint-disable @next/next/no-img-element */
"use client"
import { useEffect, useState, Suspense } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from "axios";
import Navbar from "@/components/custom/Navbar";
import Footer from "@/components/custom/Footer";

interface Job {
  image: string | null;
  id: string;
  title: string;
  description: string;
  location: string;
  salary: number;
  employmentType: string;
  jobLevel: string;
  skills: string[];
  category: string;
  name: string; // Added name for the company
}

const JobDetailContent = () => {
  const { id } = useParams();
  const { data: session } = useSession();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJob = async () => {
      if (!id) {
        setLoading(false);
        setError("No job ID provided.");
        return;
      }

      setLoading(true);
      setError(null);

      const userId = session?.user?.id;

      try {
        // Make sure the API endpoint is correct
        const response = await axios.get(`/api/jobs/get-jobs`, {
          params: { id, userId }, // Send both id and userId
        });

        // Check if jobs array exists in the response
        if (!response.data.jobs) {
          setError("Job details not found.");
          return;
        }

        const foundJob = response.data.jobs.find((job: Job) => job.id === id);

        if (foundJob) {
          setJob(foundJob);
        } else {
          setError("Job details not found.");
        }
      } catch (error) {
        // Handle specific error responses
        if (axios.isAxiosError(error) && error.response) {
          setError(`Error: ${error.response.data.error || "Failed to fetch job details. Please try again later."}`);
        } else {
          setError("Failed to fetch job details. Please try again later.");
        }
        console.error("Error fetching job:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id, session]);

  if (loading) return <p className="text-center">Loading job details...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!job) return <p className="text-center">No job found.</p>;

  const isJobSeeker = session?.user?.role === 'jobSeeker'; // Adjust the condition based on your role definition

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-8 border border-gray-200">
      <div className="flex items-center mb-6">
        <img
          src={job.image || ''} 
          alt={`${job.title} Company Logo`}
          className="h-16 w-16 rounded-full mr-4 object-cover border-2 border-blue-600"
        />
        <div>
          <h2 className="text-3xl font-bold text-gray-800">{job.title}</h2>
          <h4 className="text-lg text-gray-600">{job.name || "Company Name"}</h4>
        </div>
      </div>

      <p className="mt-2 text-gray-700">{job.description}</p>

      <div className="mt-6 border-t border-gray-300 pt-4">
        <h3 className="text-xl font-semibold mb-2">Job Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <p className="flex justify-between"><strong>Location:</strong> {job.location}</p>
          <p className="flex justify-between"><strong>Salary:</strong> ₹{job.salary}</p>
          <p className="flex justify-between"><strong>Employment Type:</strong> {job.employmentType}</p>
          <p className="flex justify-between"><strong>Job Level:</strong> {job.jobLevel}</p>
          <p className="flex justify-between">
            <strong>Skills:</strong>
            <span className="flex flex-wrap">
              {job.skills.map((skill: string) => (
                <span key={skill} className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs mr-1">
                  {skill}
                </span>
              ))}
            </span>
          </p>
          <p className="flex justify-between"><strong>Category:</strong> {job.category}</p>
        </div>
      </div>

      {isJobSeeker && ( // Conditionally render the Apply Now button based on user role
        <div className="mt-8 flex justify-center">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow hover:bg-blue-500 transition duration-200 transform hover:scale-105">
            Apply Now
          </button>
        </div>
      )}
    </div>
  );
};

const JobDetail = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <Suspense fallback={<p className="text-center">Loading...</p>}>
          <JobDetailContent />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
};

export default JobDetail;
