import { NextRequest, NextResponse } from 'next/server'; 
import { prisma } from '@/lib/prisma'; 

const fetchJobs = async (userId: string) => {
  return await prisma.jobs.findMany({
    where: { userId },
  });
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId'); 

  if (!userId || Array.isArray(userId)) {
    return NextResponse.json({ message: 'Invalid userId' }, { status: 400 }); 
  }

  try {
    const jobs = await fetchJobs(userId as string);
    return NextResponse.json({ jobs }); 
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 }); 
  }
}

