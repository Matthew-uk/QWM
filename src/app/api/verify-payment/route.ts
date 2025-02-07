import { Flutterwave } from 'flutterwave-node-v3';
import { NextResponse } from 'next/server';

const flw = new Flutterwave(
  process.env.FLUTTERWAVE_PUBLIC_KEY!,
  process.env.FLUTTERWAVE_SECRET_KEY!,
);

interface VerificationRequest {
  transactionId: string;
}

export async function POST(request: Request) {
  try {
    const { transactionId } = (await request.json()) as VerificationRequest;

    const response = await flw.Transaction.verify({ id: transactionId });

    if (
      response.data.status === 'successful' &&
      response.data.amount === response.data.charged_amount
    ) {
      return NextResponse.json({ valid: true });
    }
    return NextResponse.json({ valid: false });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Verification failed' },
      { status: 500 },
    );
  }
}
