import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function GET(
  req: NextRequest,
  { params }: { params: { planId: string } },
) {
  const prisma = new PrismaClient();
  const { planId } = params;
  const submissions = await prisma.submission.findMany({
    where: { planId },
  });
  await prisma.$disconnect();
  return NextResponse.json({ data: submissions });
}
