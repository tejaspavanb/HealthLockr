import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "HOSPITAL") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json();
  const { ownerEmailOrAadhaar, title, description, fileUrl } = data;

  const owner = await prisma.user.findFirst({
    where: {
      OR: [
        { email: ownerEmailOrAadhaar.toLowerCase() },
        { aadhaarNumber: ownerEmailOrAadhaar },
      ],
    },
  });
  if (!owner) {
    return NextResponse.json({ error: "Patient not found" }, { status: 404 });
  }

  const record = await prisma.record.create({
    data: {
      ownerId: owner.id,
      uploadedById: session.user.id,
      title,
      description,
      fileUrl,
    },
  });

  return NextResponse.json({ record });
}


