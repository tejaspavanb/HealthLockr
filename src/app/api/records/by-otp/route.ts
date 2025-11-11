import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
 otpCode: z.string().min(4),
 purpose: z.string().optional(),
});

export async function POST(req: NextRequest) {
 const session = await getServerSession(authOptions);
 if (!session || session.user.role !== "DOCTOR") {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
 }

 const body = await req.json();
 const parsed = schema.safeParse(body);

 if (!parsed.success) {
  return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
 }

 const { otpCode, purpose } = parsed.data;

 const token = await prisma.verificationToken.findFirst({
  where: {
   token: otpCode,
   identifier: { contains: ":CONSENT" },
   expires: { gt: new Date() },
  },
 });

 if (!token) {
  return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 403 });
 }

 const patientId = token.identifier.replace(":CONSENT", "");
 const patient = await prisma.user.findUnique({
  where: { id: patientId },
  select: { id: true, name: true, email: true, role: true, aadhaarNumber: true },
 });

 if (!patient) {
  await prisma.verificationToken.deleteMany({
   where: { identifier: token.identifier },
  });
  return NextResponse.json({ error: "Patient not found" }, { status: 404 });
 }

 const records = await prisma.record.findMany({
  where: { ownerId: patient.id },
  orderBy: { recordDate: "desc" },
 });

 if (records.length) {
  await prisma.accessLog.createMany({
   data: records.map((record) => ({
    actorId: session.user.id,
    patientId: patient.id,
    recordId: record.id,
    purpose: purpose ?? "patient-consent",
   })),
  });
 }

 await prisma.verificationToken.deleteMany({
  where: { identifier: token.identifier },
 });

 return NextResponse.json({ patient, records });
}

