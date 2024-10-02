// Define the structure of your job data
export  interface IJobData {
    id: number;
    name: string;
    position: string;
    jobOverview: string;
    skills: string[];
    requirements: {
      education: string;
      experience: string;
      skills: string[];
    };
    salary: string; // e.g., "Rp 9.000.000 / month"
    companyOverview: {
      focus: string;
      goals: string;
    };
    companyLocation: {
      address: string;
      city: string;
      province: string;
      postalCode: string;
    };
    employeeCount: number;
  }
  
  // Define the props expected by JobCard component
  export  interface IJobCardProps {
    id: number;
    logo: string;
    organization: string;
    province: string;
    city: string;
    title: string;
    type: 'fullTime' | 'partTime' | 'freelance' | 'contractual';
    description: string;
    salary: string;
    salaryType: 'month' | 'year';
  }
  
  // Define the props expected by Jobs component
  export interface IJobsProps {
    data: IJobData[];
  }
  