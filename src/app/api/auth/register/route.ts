import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { hashPassword } from "@/lib/auth";

const schema = z.object({
 role: z.enum(["USER", "DOCTOR", "HOSPITAL"]),
 name: z.string().min(1),
 email: z.string().email(),
 password: z.string().min(6),
 aadhaarNumber: z.string().min(6).max(16).trim().optional(),
 mciId: z.string().trim().optional(),
 hospitalName: z.string().trim().optional(),
 hospitalId: z.string().trim().optional(),
});

export async function POST(req: NextRequest) {
 const json = await req.json();
 const parsed = schema.safeParse(json);
 if (!parsed.success) {
  return NextResponse.json({ error: "Invalid input" }, { status: 400 });
 }
 const { role, name, email, password, aadhaarNumber, mciId, hospitalName, hospitalId } =
  parsed.data;

 if ((role === "USER" || role === "DOCTOR") && !aadhaarNumber) {
  return NextResponse.json(
   { error: "Aadhaar number is required for patients and doctors" },
   { status: 400 }
  );
 }

 if ((role === "DOCTOR" || role === "HOSPITAL") && (!hospitalName || !hospitalId)) {
  return NextResponse.json(
   { error: "Hospital name and ID are required for doctors and hospitals" },
   { status: 400 }
  );
 }

 const existing = await prisma.user.findFirst({
  where: {
   OR: [
    { email: email.toLowerCase() },
    aadhaarNumber ? { aadhaarNumber } : undefined,
   ].filter(Boolean) as any,
  },
 });
 if (existing) {
  return NextResponse.json({ error: "User already exists" }, { status: 409 });
 }

 const passwordHash = await hashPassword(password);

 const user = await prisma.user.create({
  data: {
   name,
   email: email.toLowerCase(),
   passwordHash,
   role,
   aadhaarNumber: aadhaarNumber ?? null,
   mciId: role === "DOCTOR" ? mciId ?? null : null,
   hospitalName: role === "DOCTOR" || role === "HOSPITAL" ? hospitalName ?? null : null,
   hospitalId: role === "DOCTOR" || role === "HOSPITAL" ? hospitalId ?? null : null,
  },
  select: { id: true },
 });

 return NextResponse.json({ id: user.id }, { status: 201 });
}
