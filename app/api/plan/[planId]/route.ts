import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest } from "next";

type SubmissionInput = {
  planId: string;
  name: string;
  place: string;
  desc?: string;
};

export async function GET(
  req: NextApiRequest,
  { params }: { params: { planId: string } },
) {
  const prisma = new PrismaClient();
  const { planId } = params;
  const plan = await prisma.plan.findUnique({
    where: { id: planId },
    select: {
      title: true,
    },
  });
  await prisma.$disconnect();
  return NextResponse.json({ title: plan?.title });
}

export async function POST(
  req: NextRequest,
  { params }: { params: { planId: string } },
) {
  const prisma = new PrismaClient();
  const { name, desc, place }: SubmissionInput = await req.json();
  await prisma.submission.create({
    data: {
      name,
      desc,
      place,
      planId: params.planId,
    },
  });
  await prisma.$disconnect();
  return NextResponse.json({});
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { planId: string } },
) {
  const prisma = new PrismaClient();
  const plan = await prisma.plan.findUnique({
    where: { id: params.planId },
    include: {
      submissions: true,
    },
  });
  if (plan?.submissions && plan?.submissions.length > 0) {
    const randomIndex = getRandomInt(0, (plan?.submissions.length || 1) - 1);
    const selectedOption = plan?.submissions[randomIndex].id;
    await prisma.selectedOption.upsert({
      where: { planId: params.planId },
      update: {
        submissionId: selectedOption,
      },
      create: {
        submissionId: selectedOption,
        planId: params.planId,
      },
    });
  }
  await prisma.$disconnect();
  return NextResponse.json({});
}

const getRandomInt = (minNum: number, maxNum: number) => {
  const min = Math.ceil(minNum);
  const max = Math.floor(maxNum);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
