import { Button } from "@/components/ui/button";
import toast, { Toaster } from "react-hot-toast";

type Job = {
  id?: string;
  title: string;
  description: string;
  location: string;
  salary?: number | null;
  employmentType?: string; 
  jobLevel?: string;
  skills?: string;
};

const JobList = ({
  jobs,
  onEdit,
  onDelete,
  onView,
  onViewApplicants,
}: {
  jobs: Job[];
  onEdit: (job: Job) => void;
  onDelete: (jobId: string) => void;
  onView: (job: Job) => void;
  onViewApplicants: (jobId: string) => void;
}) => (
  <>
    <Toaster />
    <div className="p-2 rounded-lg shadow-md mt-6 text-center">
      <h2 className="text-xl font-bold mb-4">Jobs You Listed</h2>
      <div className="max-h-[540px] max-w-[500] overflow-y-auto"> 
        <ul className="space-y-4">
          {jobs.map((job) => (
            <li key={job.id} className="border-b py-4 flex justify-between items-start space-x-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold">{job.title}</h3>
                <p className="text-sm text-gray-600">{job.description}</p>
                <p className="text-sm text-gray-500">{job.location}</p>
              </div>
              <div className="flex-shrink-0 space-x-2">
                <Button
                  onClick={() => {
                    onView(job);
                  }}
                  className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                >
                  View
                </Button>
                <Button
                  onClick={() => {
                    onViewApplicants(job.id!);
                  }}
                  className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                >
                  View Applicants
                </Button>
                <Button
                  onClick={() => {
                    onEdit(job);
                  }}
                  className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => {
                    onDelete(job.id!);
                    toast.success("Job deleted successfully!");
                  }}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                >
                  Delete
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </>
);

export default JobList;
