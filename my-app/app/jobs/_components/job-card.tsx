/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-undef */
import React from 'react';
import { useRouter } from 'next/navigation'; 

interface JobCardProps {
  id: string; 
  logo: string | null;
  image : string;
  description : string;
  organization: string;
  location: string;
  title: string;
  type: string;
  salary: number; 
  salaryType: 'month' | 'year';
  employmentType: string;
  jobLevel: string;
}

const JobCard: React.FC<JobCardProps> = ({
  id,
  logo,
  organization,
  location,
  title,
  type,
  salary,
  salaryType,
}) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/jobs/${id}`); 
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white shadow-md rounded-lg p-5 transition-transform hover:scale-105 cursor-pointer"
    >
      <div className="flex items-center gap-4">
        <img
          src={logo || ""} 
          alt={`${organization} logo`} 
          width={50}
          height={48}
          className="rounded-full"
        />
        <div className="flex flex-col">
          <h2 className="font-bold text-lg">{title}</h2>
          <p className="text-gray-600">{organization}</p>
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <span className="bg-green-100 text-green-600 text-xs font-semibold py-1 px-3 rounded-full">
          {type}
        </span>
      </div>

      <p className="text-gray-500 mt-4">{location}</p>

      <p className="text-blue-600 font-semibold mt-2">
        {`Rs ${salary.toLocaleString('id-ID')} / ${salaryType === 'month' ? 'Month' : 'Year'}`}
      </p>
    </div>
  );
};

export default JobCard;
