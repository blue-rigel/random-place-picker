import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { ulid } from "ulidx";

export async function GET() {
  const prisma = new PrismaClient();
  const plans = await prisma.plan.findMany({
    include: {
      _count: {
        select: { submissions: true },
      },
      selectedOption: {
        select: {
          submission: {
            select: {
              place: true,
            },
          },
        },
      },
    },
  });
  await prisma.$disconnect();
  return NextResponse.json({ data: plans });
}

export async function POST(req: NextRequest) {
  const prisma = new PrismaClient();
  const { title }: { title: string } = await req.json();
  await prisma.plan.create({
    data: {
      id: ulid(),
      title,
    },
  });
  await prisma.$disconnect();
  return NextResponse.json({});
}

export async function DELETE(req: NextRequest) {
  const prisma = new PrismaClient();
  const { id }: { id: string } = await req.json();
  await prisma.submission.deleteMany({ where: { planId: id } });
  await prisma.selectedOption.deleteMany({ where: { planId: id } });
  await prisma.plan.delete({ where: { id } });
  await prisma.$disconnect();
  return NextResponse.json({});
}
