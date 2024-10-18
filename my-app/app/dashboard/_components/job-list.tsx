import { Button } from "@/components/ui/button";
import { Toaster, toast } from "react-hot-toast";

type Job = {
  id: string;
  name: string; 
  title: string;
  description: string;
  location: string;
  salary?: string | number | null;
  employmentType?: string;
  jobLevel?: string;
  skills?: string;
  category?: string;
  website?: string;
  image?: string; 
  organization?: string; 
};

interface JobListProps {
  jobs: Job[];
  onEdit: (job: Job) => void;
  onView: (job: Job) => void;
  onDelete: (jobId: string) => void;
  onViewApplicants: (jobId: string) => void;
}

const JobList: React.FC<JobListProps> = ({ jobs, onView, onDelete, onViewApplicants }) => {
  // Toast notification functions
  const handleView = (job: Job) => {
    onView(job);
    toast.success(`Viewing job: ${job.title}`);
  };

  // const handleEdit = (job: Job) => {
  //   onEdit(job);
  //   toast.success(`Editing job: ${job.title}`);
  // };

  const handleDelete = (jobId: string) => {
    onDelete(jobId);
    toast.success(`Deleted job Successfully`)
  };

  const handleViewApplicants = (jobId: string) => {
    onViewApplicants(jobId);
    toast.success(`Viewing applicants for job ID: ${jobId}`);
  };

  return (
    <>
      <Toaster />
      <div className="p-5 bg-white shadow-md rounded-md max-w-5xl mx-auto overflow-hidden">
        <h2 className="text-2xl font-bold mb-2 text-center">Job Listings</h2>
        <div className="h-auto overflow-y-auto">
          <table className="min-w-full bg-white divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 w-1/2">Title</th> 
                <th className="py-3 px-4 text-center text-sm font-medium text-gray-600 w-1/2">Actions</th> 
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {jobs.length > 0 ? (
                jobs.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-100 transition-colors duration-200">
                    <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-700">{job.title}</td>
                    <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-700">
                      <div className="flex space-x-2">
                        <Button onClick={() => handleView(job)} className="mr-2">View</Button>
                        {/* <Button onClick={() => handleEdit(job)} className="mr-2">Edit</Button> */}
                        <Button onClick={() => handleViewApplicants(job.id)} className="mr-2">View Applicants</Button>
                        <Button onClick={() => handleDelete(job.id)} className="text-red-600">Delete</Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2} className="py-3 px-4 text-center text-gray-500">No jobs found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default JobList;
