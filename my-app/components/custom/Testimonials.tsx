const Testimonials = () => {
  interface IProps {
    review: string;
    name: string;
    position: string;
    organization: string;
  }

  const ReviewCard = ({ review, name, position, organization }: IProps) => {
    return (
      <div className="shadow-xl border border-gray-200 text-center p-8 w-full max-w-[900px] rounded-md m-auto">
        <p className="leading-loose text-gray-500 font-medium">
          &apos;{review}&apos;
        </p>
        <p className="font-semibold text-lg mt-8">{name}</p>
        <p className="text-gray-400 font-medium mt-2">
          {position} at {organization}
        </p>
      </div>
    );
  };

  return (
    <div className="md:pt-16 pt-10 pb-20 md:px-0 px-10">
      <h1
        style={{ lineHeight: "65px" }}
        className="md:text-4xl text-2xl py-10  text-center mb-12 font-semibold"
      >
        <span className="text-[#504ED7]">Reviews</span> of People Who Have{" "}
        <br className="md:block hidden" /> Found Jobs Through Job Seek
      </h1>
      <div>
        <ReviewCard
          review="Job Seek platform really helpful to find jobs that suitable for me."
          name="Wade Warren"
          position="Software Engineer"
          organization="Neo Borngo"
        />
      </div>
    </div>
  );
};

export default Testimonials;
