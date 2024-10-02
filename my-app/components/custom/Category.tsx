// import ReviewCard from '../review-card/page'

// import CategoryContainer from "@/app/(auth)/category-container/page";

const CategoryContainer = () => {

    interface JobCategory {
        title: string;
        icon: JSX.Element;
        color: string;
        jobsAvailable: number;
      }
      
      const jobCategories: JobCategory[] = [
        { title: "Data Scientist", icon: <span role="img" aria-label="Data Scientist">🔬</span>, color: "text-lime-500", jobsAvailable: 1 },
        { 
          title: "Blockchain Developer", 
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-8 h-8">
              <path fill="#FFD43B" d="M260.4 254.9 131.5 33.1a2.2 2.2 0 0 0 -3.8 0L.3 254.9A2.2 2.2 0 0 0 .3 257.1L129.1 478.9a2.2 2.2 0 0 0 3.8 0L260.4 257.1A2.2 2.2 0 0 0 260.4 254.9zm39.1-25.7a2.2 2.2 0 0 0 1.9 1.1h66.5a2.2 2.2 0 0 0 1.9-3.3L259.1 33.1a2.2 2.2 0 0 0 -1.9-1.1H190.7a2.2 2.2 0 0 0 -1.9 3.3zM511.7 254.9 384.9 33.1A2.2 2.2 0 0 0 383 32h-66.6a2.2 2.2 0 0 0 -1.9 3.3L440.7 256 314.5 476.7a2.2 2.2 0 0 0 1.9 3.3h66.6a2.2 2.2 0 0 0 1.9-1.1L511.7 257.1A2.2 2.2 0 0 0 511.7 254.9zM366 284.9H299.5a2.2 2.2 0 0 0 -1.9 1.1l-108.8 190.6a2.2 2.2 0 0 0 1.9 3.3h66.5a2.2 2.2 0 0 0 1.9-1.1l108.8-190.6A2.2 2.2 0 0 0 366 284.9z"/>
            </svg>
          ), 
          color: "text-orange-400", 
          jobsAvailable: 1 
        },
        { title: "Frontend Developer", icon: <span role="img" aria-label="Frontend Developer">💻</span>, color: "text-red-400", jobsAvailable: 1 },
        { 
          title: "Mobile Developer", 
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-8 h-8">
              <path fill="#74C0FC" d="M80 0C44.7 0 16 28.7 16 64l0 384c0 35.3 28.7 64 64 64l224 0c35.3 0 64-28.7 64-64l0-384c0-35.3-28.7-64-64-64L80 0zm80 432l64 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-64 0c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/>
            </svg>
          ), 
          color: "text-blue-500", 
          jobsAvailable: 1 
        },
        { 
          title: "Accounting", 
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-8 h-8">
              <path fill="#ff8080" d="M64 0C28.7 0 0 28.7 0 64L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-384c0-35.3-28.7-64-64-64L64 0zM96 64l192 0c17.7 0 32 14.3 32 32l0 32c0 17.7-14.3 32-32 32L96 160c-17.7 0-32-14.3-32-32l0-32c0-17.7 14.3-32 32-32zm32 160a32 32 0 1 1 -64 0 32 32 0 1 1 64 0zM96 352a32 32 0 1 1 0-64 32 32 0 1 1 0 64zM64 416c0-17.7 14.3-32 32-32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-96 0c-17.7 0-32-14.3-32-32zM192 256a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm32 64a32 32 0 1 1 -64 0 32 32 0 1 1 64 0zm64-64a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm32 64a32 32 0 1 1 -64 0 32 32 0 1 1 64 0zM288 448a32 32 0 1 1 0-64 32 32 0 1 1 0 64z"/>
            </svg>
          ), 
          color: "text-red-500", 
          jobsAvailable: 1 
        },
        { 
            title: "Marketing & Communication", 
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-8 h-8">
                <path fill="#74C0FC" d="M480 32c0-12.9-7.8-24.6-19.8-29.6s-25.7-2.2-34.9 6.9L381.7 53c-48 48-113.1 75-181 75l-8.7 0-32 0-96 0c-35.3 0-64 28.7-64 64l0 96c0 35.3 28.7 64 64 64l0 128c0 17.7 14.3 32 32 32l64 0c17.7 0 32-14.3 32-32l0-128 8.7 0c67.9 0 133 27 181 75l43.6 43.6c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6l0-147.6c18.6-8.8 32-32.5 32-60.4s-13.4-51.6-32-60.4L480 32zm-64 76.7L416 240l0 131.3C357.2 317.8 280.5 288 200.7 288l-8.7 0 0-96 8.7 0c79.8 0 156.5-29.8 215.3-83.3z"/>
              </svg>
            ), 
            color: "text-blue-400", 
            jobsAvailable: 1 
          },
        { title: "Backend Developer", icon: <span role="img" aria-label="Backend Developer">🖥️</span>, color: "text-indigo-500", jobsAvailable: 2 },
        { 
            title: "Data Analyst", 
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-8 h-8">
                <path fill="#74C0FC" d="M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64L0 400c0 44.2 35.8 80 80 80l400 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 416c-8.8 0-16-7.2-16-16L64 64zm406.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L320 210.7l-57.4-57.4c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L240 221.3l57.4 57.4c12.5 12.5 32.8 12.5 45.3 0l128-128z"/>
              </svg>
            ), 
            color: "text-blue-400", 
            jobsAvailable: 2 
          },
      ];

      
  return (
    <div className='bg-gray-100 py-20 md:px-16 px-8'>
      <h1 style={{ lineHeight: '65px' }} className='md:text-4xl text-3xl font-semibold text-center mb-10'>
        One Platform <br className='hidden md:block' /> Many <span className='text-[#504ED7]'>Solutions</span>
      </h1>
      <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {jobCategories.map((category, index) => (
          <div
            key={index}
            className="bg-white rounded shadow-md p-6 flex items-center space-x-4 h-[8rem]"
          >
            <span className={`text-4xl ${category.color}`}>
              {category.icon}
            </span>
            <div>
              <h3 className="text-lg font-semibold font-sans">{category.title}</h3>
              <p className="text-gray-600 text-sm">
                {category.jobsAvailable} job{category.jobsAvailable !== 1 ? 's' : ''} available
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  )
}

export default CategoryContainer
