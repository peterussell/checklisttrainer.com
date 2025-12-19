import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Resource } from "sst";

import { s3 } from "./s3Client.js";

export async function getAircraftImgSignedUrl(ownerId: string, filename: string) {
  const command = new GetObjectCommand({
    Bucket: Resource.aircraftImages.name,
    Key: `${ownerId}/${filename}`,
  });

  return await getSignedUrl(s3, command, { expiresIn: 3600 });
}
