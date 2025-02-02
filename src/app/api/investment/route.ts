// app/api/cron/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Your cron job logic
    console.log('Cron job executed at:', new Date().toISOString());

    // Example: Database cleanup
    // await prisma.logs.deleteMany({ where: { expired: true } });

    return NextResponse.json(
      { success: true, timestamp: new Date().toISOString() },
      { status: 200 },
    );
  } catch (error) {
    console.error('Cron job failed:', error);
    return NextResponse.json(
      { success: false, error: 'Cron job failed' },
      { status: 500 },
    );
  }
}
