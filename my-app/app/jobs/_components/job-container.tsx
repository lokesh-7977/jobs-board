import { IJob } from "../../types/interface"; // Correct the import path if necessary
import Link from "next/link";
import JobCard from "./job-card";

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
            id={String(item._id)} // Ensure that _id is always convertible to a string
            key={item._id}
            logo={item.organization?.user.avatar || ""} // Handle potential undefined value
            organization={item.organization?.user.name || "Unknown Organization"} // Provide a fallback
            province={String(item.organization?.user.province) || "Unknown Province"} // Ensure province is a string
            city={String(item.organization?.user.city) || "Unknown City"} // Ensure city is a string
            description={item.overview}
            title={item.position}
            salary={item.salary}
            salaryType="month" // Change this based on your data if needed
            type={item.employmentType}
            level={""} // Update if you want to include the job level
          />
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
