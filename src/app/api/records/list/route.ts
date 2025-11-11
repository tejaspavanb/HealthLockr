import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "DOCTOR") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { patientEmailOrAadhaar } = await req.json();

  const patient = await prisma.user.findFirst({
    where: {
      OR: [
        { email: patientEmailOrAadhaar.toLowerCase() },
        { aadhaarNumber: patientEmailOrAadhaar },
      ],
    },
  });

  if (!patient) return NextResponse.json({ records: [], patient: null });

  const records = await prisma.record.findMany({
    where: { ownerId: patient.id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ records, patient });
}


