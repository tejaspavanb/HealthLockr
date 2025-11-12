import { generateUploadButton, generateUploadDropzone, generateUploader } from "@uploadthing/react";

import type { AppFileRouter } from "@/app/api/uploadthing/core";

const clientConfig =
 typeof window !== "undefined"
  ? {
     url: `${window.location.origin}/api/uploadthing`,
    }
  : undefined;

export const UploadButton = generateUploadButton<AppFileRouter>(clientConfig);
export const UploadDropzone = generateUploadDropzone<AppFileRouter>(clientConfig);
export const Uploader = generateUploader<AppFileRouter>(clientConfig);

