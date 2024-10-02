"use client"
import Navbar from '@/components/custom/Navbar';
import { data } from '../../data/index'; // Assuming this is your data file
import { useParams } from 'next/navigation';
import Footer from '@/components/custom/Footer';

const JobDetails = () => {
  const { id } = useParams();

  // Get job details based on id
  const job = data.find((item) => item.id === parseInt(id as string));

  if (!job) {
    return <div>Job not found</div>;
  }

  return (
    <>
        <Navbar/>
        
        <div className="flex w-full pl-0 md:pl-20 min-h-screen">
      <div className=" p-2 md:p-6">
        {/* Job Title and Company */}
        <div className="flex items-center space-x-4">
          <div className="bg-blue-200 rounded-full w-16 h-16 flex items-center justify-center">
            <span className="text-blue-600 text-xl font-bold">NB</span>
          </div>
          <div>
            <h1 className="text-2xl font-semibold">{job.position}</h1>
            <p className="text-gray-500">{job.name}</p>
          </div>
        </div>

        {/* Job Overview */}
        <section className="mt-6">
          <h2 className="text-lg font-semibold">Job Overview</h2>
          <p className="text-gray-700 mt-2">{job.jobOverview}</p>
        </section>

        {/* Skills and Expertise */}
        <section className="mt-6">
          <h2 className="text-lg font-semibold">Skills and Expertise</h2>
          <div className="flex flex-col md:flex-row gap-2 mt-2 items-start">
            {job.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Requirements */}
        <section className="mt-6">
          <h2 className="text-lg font-semibold">Requirements</h2>
          <ul className="list-disc list-inside mt-2 text-gray-700">
            <li>{job.requirements.education}</li>
            <li>{job.requirements.experience}</li>
            {job.requirements.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </section>

        {/* Salary */}
        <section className="mt-6">
          <h2 className="text-lg font-semibold">Salary</h2>
          <p className="text-gray-700 mt-2">{job.salary}</p>
        </section>

        {/* Company Overview */}
        <section className="mt-6">
          <h2 className="text-lg font-semibold">Company Overview</h2>
          <p className="text-gray-700 mt-2">{job.companyOverview.focus}</p>
          <p className="text-gray-700 mt-1">{job.companyOverview.goals}</p>
        </section>

        {/* Company Location */}
        <section className="mt-6">
          <h2 className="text-lg font-semibold">Company Location</h2>
          <p className="text-gray-700 mt-2">
            {job.companyLocation.address}, {job.companyLocation.city}, {job.companyLocation.province}, {job.companyLocation.postalCode}
          </p>
        </section>

        {/* Employee Count */}
        <section className="mt-6">
          <h2 className="text-lg font-semibold">Estimated Company Total Employees</h2>
          <p className="text-gray-700 mt-2">{job.employeeCount} people</p>
        </section>
      </div>
    </div>
    
    <Footer/>
    </>
  );
};

export default JobDetails;
