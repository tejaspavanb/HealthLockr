"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const fileRouter = {
 medicalRecord: f({ "application/pdf": { maxFileSize: "16MB" }, "image/*": { maxFileSize: "8MB" } })
  .middleware(async () => {
   const session = await getServerSession(authOptions);
   if (!session) throw new UploadThingError("You must be signed in to upload");
   if (session.user.role === "DOCTOR") {
    throw new UploadThingError("Doctors cannot upload records");
   }
   return { userId: session.user.id, role: session.user.role };
  })
  .onUploadComplete(async ({ metadata, file }) => {
   return {
    uploadedBy: metadata.userId,
    fileUrl: file.url,
    fileKey: file.key,
    fileName: file.name,
    fileSize: file.size,
   };
  }),
} satisfies FileRouter;

export type AppFileRouter = typeof fileRouter;

