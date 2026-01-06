
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    // trigger revalidation (tidak perlu await)
    revalidatePath('/', 'layout');

    return NextResponse.json({
      revalidated: true,
      time: new Date().toISOString()
    });
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}

