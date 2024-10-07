export  interface IJobData {
    title: string;
    employmentType: never;
    description: string;
    jobLevel: never;
    image: string;
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
    salary: string;
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
  
  export interface IJobsProps {
    data: IJobData[];
  }
  