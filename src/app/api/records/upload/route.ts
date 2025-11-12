import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const payloadSchema = z.object({
 title: z.string().min(1),
 description: z.string().optional(),
 recordDate: z.string().min(1),
 fileUrl: z.string().url(),
 fileKey: z.string().min(1),
 fileName: z.string().min(1),
 fileSize: z.number().int().positive(),
 ownerEmailOrAadhaar: z.string().trim().optional(),
});

export async function POST(req: NextRequest) {
 const session = await getServerSession(authOptions);
 if (!session || session.user.role === "DOCTOR") {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
 }

 const body = await req.json();
 const parsed = payloadSchema.safeParse(body);

 if (!parsed.success) {
  return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
 }

 const { title, description, recordDate, fileUrl, fileKey, fileName, fileSize, ownerEmailOrAadhaar } =
  parsed.data;

 const parsedRecordDate = new Date(recordDate);
 if (Number.isNaN(parsedRecordDate.getTime())) {
  return NextResponse.json({ error: "Invalid record date" }, { status: 400 });
 }

 let ownerId = session.user.id;

 if (session.user.role === "HOSPITAL") {
  if (!ownerEmailOrAadhaar) {
   return NextResponse.json(
    { error: "Patient email or Aadhaar is required" },
    { status: 400 }
   );
  }
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
  ownerId = owner.id;
 }

 const record = await prisma.record.create({
  data: {
   ownerId,
   uploadedById: session.user.id,
   title,
   description,
   recordDate: parsedRecordDate,
   fileUrl,
   fileKey,
   fileName,
   fileSize,
  },
 });

 return NextResponse.json({ record }, { status: 201 });
}
