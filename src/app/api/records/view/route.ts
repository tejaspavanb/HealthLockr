import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "DOCTOR") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { recordId, purpose } = await req.json();

  const record = await prisma.record.findUnique({ where: { id: recordId } });
  if (!record) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.accessLog.create({
    data: {
      actorId: session.user.id,
      patientId: record.ownerId,
      recordId: record.id,
      purpose: purpose ?? "treatment",
    },
  });

  return NextResponse.json({ record });
}


