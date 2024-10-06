import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface JobCardProps {
  id: string; // Use string type to match the API response
  title: string;
  description: string;
  location: string;
  salary: number;
  employmentType: string;
  image: string | null;
  jobLevel: string;
}

const JobCard: React.FC<JobCardProps> = ({
  id,
  title,
  description,
  location,
  salary,
  employmentType,
  image : image,
  jobLevel,
}) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/jobs/${id}`); 
  };

  return (
    <div
      onClick={handleCardClick}
      className="cursor-pointer border-2 hover:border-blue-700 bg-white shadow-lg rounded-lg p-6 transition-transform hover:scale-105"
    >
      <div className="flex items-center gap-4 mb-4">
        <Image 
          src={image || "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"} 
          className="w-12 h-12 rounded-full object-cover" 
          alt={title} 
          width={48} 
          height={48} 
        />
        <div>
          <p className="text-sm text-gray-600">{location}</p>
        </div>
      </div>

      <h2 className="font-bold text-lg text-gray-800 mb-2">{title}</h2>

      <p className="text-sm text-gray-500 mb-4">{employmentType}</p>

      <p className="text-xs text-gray-400 truncate mb-6">{description}</p>

      <p className="text-lg font-semibold text-black">
        {`Rs ${salary.toLocaleString('id-ID')} / month`}
      </p>
      <p className="text-xs text-gray-500">{jobLevel}</p>
    </div>
  );
};

export default JobCard;
