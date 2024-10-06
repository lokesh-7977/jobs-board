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
  description: string;
  salary: number;
  salaryType: 'month' | 'year';
  level: string;  
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
  description
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
        <Image src={logo} className="w-12 h-12 rounded-full object-cover" alt={''} width={48} height={48} />
        <div>
          <p className="text-sm text-gray-600">{organization}</p>
          <p className="text-xs text-gray-400">{`${city}, ${province}`}</p>
        </div>
      </div>

      <h2 className="font-bold text-lg text-gray-800 mb-2">{title}</h2>

      <p className="text-sm text-gray-500 mb-4">{type}</p>

      <p className="text-xs text-gray-400 truncate mb-6">{description}</p>

      <p className="text-lg font-semibold text-black">
        {`Rs ${salary.toLocaleString('id-ID')} / ${salaryType === 'month' ? 'month' : 'year'}`}
      </p>
    </div>
  );
};

export default JobCard;
