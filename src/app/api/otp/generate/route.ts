import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function generateSixDigitCode(): string {
 return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST() {
 const session = await getServerSession(authOptions);
 if (!session || session.user.role !== "USER") {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
 }

 // Invalidate previous codes for this user
 await prisma.verificationToken.deleteMany({
  where: { identifier: `${session.user.id}:CONSENT` },
 });

 const code = generateSixDigitCode();
 const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

 await prisma.verificationToken.create({
  data: {
   identifier: `${session.user.id}:CONSENT`,
   token: code,
   expires,
  },
 });

 // For demo purposes we return the code.
 return NextResponse.json({ code, expires });
}


