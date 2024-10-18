/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { useRouter } from 'next/navigation';
import { FiBriefcase, FiMapPin } from 'react-icons/fi'; // Import icons for employment type and location

interface JobCardProps {
  id: string; 
  title: string;
  description: string;
  location: string; // Ensure this accepts a full location
  salary: number | null; // Allow salary to be null
  employmentType: string;
  image: string | null;
  jobLevel: string;
  companyName: string; // Added for the company name
}

const JobCard: React.FC<JobCardProps> = ({
  id,
  title,
  location,
  salary,
  employmentType,
  image,
  jobLevel,
  companyName,
}) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/jobs/${id}`); 
  };

  return (
    <div
      onClick={handleCardClick}
      className="cursor-pointer border bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105 hover:shadow-2xl relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br opacity-70 rounded-lg"></div>

      <div className="flex items-center mb-4 relative z-10">
        <img 
          src={image || ''} 
          className="w-14 h-14 rounded-full object-cover border-2 shadow-sm" 
          alt={title} 
          width={56} 
          height={56} 
        />
        <div className="ml-4">
          <h2 className="font-bold text-lg text-gray-800">{title}</h2>
          <p className="text-sm text-gray-600 font-semibold">{companyName}</p>
        </div>
      </div>

      <div className="flex items-center mb-2">
        <p className="text-sm text-gray-500 flex items-center mr-4">
          <FiBriefcase className="mr-1 text-blue-500" /> {employmentType}
        </p>
        <p className="text-sm text-gray-500 flex items-center">
          <FiMapPin className="mr-1 text-blue-500" /> {location}
        </p>
      </div>

      <p className="text-lg font-bold text-black mb-1">
        {`₹ ${salary !== null ? salary.toLocaleString('en-IN') : 'N/A'} / month`} 
      </p>

      <p className="text-xs text-gray-500"><b>Job Level:</b>{jobLevel}</p>
    </div>
  );
};

export default JobCard;
