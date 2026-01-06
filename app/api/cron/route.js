import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function GET(req) {
  if (
    req.headers.get('authorization') !==
    `Bearer ${process.env.CRON_SECRET}`
  ) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  revalidatePath('/', 'layout');

  return NextResponse.json({ revalidated: true });
}

