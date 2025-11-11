import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
 const session = await getServerSession(authOptions);
 if (!session || session.user.role !== "DOCTOR") {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
 }
 const { recordId, purpose, otpCode, patientId } = await req.json();

 const record = await prisma.record.findUnique({ where: { id: recordId } });
 if (!record) {
  return NextResponse.json({ error: "Not found" }, { status: 404 });
 }

 let accessGranted = false;

 if (otpCode) {
  const vt = await prisma.verificationToken.findFirst({
   where: {
    identifier: `${record.ownerId}:CONSENT`,
    token: otpCode,
    expires: { gt: new Date() },
   },
  });

  if (vt) {
   accessGranted = true;
  }
 }

 if (!accessGranted && patientId && patientId === record.ownerId) {
  accessGranted = true;
 }

 if (!accessGranted) {
  return NextResponse.json(
   { error: "Consent required. Provide a valid OTP or patient identifier." },
   { status: 403 }
  );
 }

 if (otpCode) {
  await prisma.verificationToken.deleteMany({
   where: { identifier: `${record.ownerId}:CONSENT` },
  });
 }

 await prisma.accessLog.create({
  data: {
   actorId: session.user.id,
   patientId: record.ownerId,
   recordId: record.id,
   purpose: purpose ?? (otpCode ? "patient-consent" : "aadhaar-lookup"),
  },
 });

 return NextResponse.json({ record });
}
