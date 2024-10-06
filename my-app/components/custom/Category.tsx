const CategoryContainer = () => {
  interface JobCategory {
    title: string;
    icon: JSX.Element;
    color: string;
    jobsAvailable: number;
  }

  const jobCategories: JobCategory[] = [
    {
      title: "Data Scientist",
      icon: <span role="img" aria-label="Data Scientist">🔬</span>,
      color: "bg-lime-500",
      jobsAvailable: 10,
    },
    {
      title: "Frontend Developer",
      icon: <span role="img" aria-label="Frontend Developer">💻</span>,
      color: "bg-red-400",
      jobsAvailable: 15,
    },
    {
      title: "Mobile Developer",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512"
          className="w-8 h-8"
          aria-label="Mobile Developer"
        >
          <path
            fill="#74C0FC"
            d="M80 0C44.7 0 16 28.7 16 64l0 384c0 35.3 28.7 64 64 64l224 0c35.3 0 64-28.7 64-64l0-384c0-35.3-28.7-64-64-64L80 0zm80 432l64 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-64 0c-8.8 0-16-7.2-16-16s7.2-16 16-16z"
          />
        </svg>
      ),
      color: "bg-blue-500",
      jobsAvailable: 12,
    },
    {
      title: "Backend Developer",
      icon: <span role="img" aria-label="Backend Developer">🖥️</span>,
      color: "bg-purple-500",
      jobsAvailable: 6,
    },
    {
      title: "Data Analyst",
      icon: <span role="img" aria-label="Data Analyst">📊</span>,
      color: "bg-green-500",
      jobsAvailable: 5,
    },
    {
      title: "UI/UX Designer",
      icon: <span role="img" aria-label="UI/UX Designer">🎨</span>,
      color: "bg-pink-500",
      jobsAvailable: 4,
    },
    {
      title: "Project Manager",
      icon: <span role="img" aria-label="Project Manager">📅</span>,
      color: "bg-yellow-500",
      jobsAvailable: 3,
    },
    {
      title: "Digital Marketing",
      icon: <span role="img" aria-label="Digital Marketing">📈</span>,
      color: "bg-orange-500",
      jobsAvailable: 7,
    },
  ];

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold text-center mb-6">One Place Many Solutions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {jobCategories.map((category) => (
          <div
            key={category.title}
            className={`relative p-6 flex flex-col items-center justify-center rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 ${category.color} text-white`}
          >
            <div className="text-5xl mb-2">{category.icon}</div>
            <h3 className="text-lg font-semibold text-center">{category.title}</h3>
            <p className="text-sm text-center">{category.jobsAvailable} jobs available</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryContainer;
