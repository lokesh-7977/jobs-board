/* eslint-disable react/jsx-no-undef */
import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface JobCardProps {
  id: number;
  logo: string;
  organization: string;
  province: string;
  city: string;
  title: string;
  type: string;
  description: string; // Unused, consider using it or removing
  salary: number;
  salaryType: 'month' | 'year';
  level: string; // Unused, consider using it or removing
}

const JobCard: React.FC<JobCardProps> = ({
  id,
  logo,
  organization,
  province,
  city,
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
        <Image
          src={logo || "https://www.example.com/default-image.jpg"} // Ensure the URL starts with "http://" or "https://"
          alt={`${organization} logo`} // Improved alt text for accessibility
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

      <p className="text-gray-500 mt-4">{`${city}, ${province}`}</p>

      <p className="text-blue-600 font-semibold mt-2">
        {`Rs ${salary.toLocaleString('id-ID')} / ${
          salaryType === 'month' ? 'Month' : 'Year'
        }`}
      </p>
    </div>
  );
};

export default JobCard;
