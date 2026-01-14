import { revalidatePath } from "next/cache"
import { clearNotionCache } from "@/lib/notion"
import { NextResponse } from "next/server"

export async function GET(req) {
  const { searchParams } = new URL(req.url)

  if (searchParams.get("secret") !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // 🔥 RESET CUSTOM CACHE
  clearNotionCache()

  // 🔥 REVALIDATE NEXT CACHE
  revalidatePath("/", "layout")

  return NextResponse.json({
    revalidated: true,
    cacheCleared: true,
    time: new Date().toISOString(),
  })
}

