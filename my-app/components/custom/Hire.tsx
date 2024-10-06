import React from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const steps = [
  {
    number: 1,
    title: "Post a Job",
    description: "Tell us what you need in a candidate in just 5-minutes.",
    icon: "📝",
    image:
      "https://resources.workindia.in/employer/assets/illustrations/landing/post-a-job.svg",
  },
  {
    number: 2,
    title: "Get Verified",
    description: "Our team will call to verify your employer account",
    icon: "✅",
    image:
      "https://resources.workindia.in/employer/assets/illustrations/landing/get-verified.svg",
  },
  {
    number: 3,
    title: "Get calls. Hire.",
    description:
      "You will get calls from relevant candidates within one hour or call them directly from our candidate database.",
    icon: "📞",
    image:
      "https://resources.workindia.in/employer/assets/illustrations/landing/get-calls-hire.svg",
  },
];

const GetStartedSteps = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold mb-8 pb-2 border-b-2 border-orange-500 text-center">
        Get started in 3 easy steps
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step) => (
          <Card key={step.number} className="flex flex-col">
            <CardHeader className="flex-grow">
              <CardTitle>{step.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <Image
                src={step.image}
                alt={step.title}
                layout="responsive"
                width={900}
                height={300}
                className="w-full h-auto mb-4 rounded-lg"
              />
              <p className="text-sm text-gray-600">{step.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GetStartedSteps;
