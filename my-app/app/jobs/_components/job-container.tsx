import Link from "next/link";
import JobCard from "./job-card";
import React from "react";

interface IJob {
  _id: string;
  position: string;
  overview: string;
  salary: number | string; // Allow null if no salary is provided
  employmentType: string;
  organization: {
    user: {
      logo: string;
      name: string;
    };
  };
  city: string;
  jobLevel: string; 
}

interface IProps {
  jobs: IJob[];
}

const JobContainer: React.FC<IProps> = ({ jobs }) => {
  return (
    <div className="py-20 md:px-16 px-8">
      <h1 className="text-4xl md:text-3xl font-medium text-center mb-12">
        <span className="text-[#504ED7]">Latest</span> Jobs
      </h1>
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10">
        {jobs.map((item) => (
          <JobCard
            id={String(item._id)}
            key={item._id}
            image={item.organization?.user.logo || ""} // Ensure to use 'image' prop
            title={item.position}
            description={item.overview}
            location={`${item.city}`} // Concatenate city and province for location
            salary={typeof item.salary === 'string' ? parseFloat(item.salary) : item.salary}
            employmentType={item.employmentType}
            jobLevel={item.jobLevel} // Pass job level if available
            logo={null} organization={""} type={""} salaryType={"month"}          />
        ))}
      </div>
      <Link href="/jobs" passHref>
        <a className="bg-white m-auto block w-fit mt-20 px-10 py-2 border-2 rounded-full border-[#504ED7] text-[#504ED7]">
          Find More Jobs
        </a>
      </Link>
    </div>
  );
};

export default JobContainer;
