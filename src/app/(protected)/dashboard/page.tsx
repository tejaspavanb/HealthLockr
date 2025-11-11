import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  const role = session.user.role;

  if (role === "USER") redirect("/user/dashboard");
  if (role === "DOCTOR") redirect("/doctor/dashboard");
  if (role === "HOSPITAL") redirect("/hospital/dashboard");

  return null;
}


