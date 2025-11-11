import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET() {
 const session = await getServerSession(authOptions);
 if (!session || session.user.role !== "USER") {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
 }

 const logs = await prisma.accessLog.findMany({
  where: { patientId: session.user.id },
  orderBy: { createdAt: "desc" },
  include: {
   actor: { select: { id: true, name: true, email: true, role: true } },
   record: { select: { id: true, title: true } },
  },
 });

 return NextResponse.json({ logs });
}


