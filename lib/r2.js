import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import crypto from "crypto"

const r2 = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT, // https://<accountid>.r2.cloudflarestorage.com
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY,
    secretAccessKey: process.env.R2_SECRET_KEY,
  },
})

export async function uploadToR2(buffer, contentType) {
  const hash = crypto.createHash("sha1").update(buffer).digest("hex")
  const ext = contentType?.split("/")[1] || "jpg"
  const key = `notion/${hash}.${ext}`

  await r2.send(
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET,
      Key: key,
      Body: buffer,
      ContentType: contentType,
    })
  )

  return `${process.env.R2_PUBLIC_URL}/${key}`
}

