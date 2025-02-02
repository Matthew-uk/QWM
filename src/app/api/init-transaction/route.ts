import { NextResponse } from 'next/server';

interface TransactionInitRequest {
  amount: number;
  reference: string;
}

export async function POST(req: Request) {
  const { amount, reference } = (await req.json()) as TransactionInitRequest;

  const auth = Buffer.from(
    `${process.env.NEXT_PUBLIC_MONNIFY_API_KEY}:${process.env.MONNIFY_CLIENT_SECRET}`,
  ).toString('base64');

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_MONNIFY_BASE_URL}/api/v1/merchant/transactions/init-transaction`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify({
        amount,
        customerName: 'John Doe',
        customerEmail: 'customer@email.com',
        paymentReference: reference,
        paymentDescription: 'Product Purchase',
        currencyCode: 'NGN',
        contractCode: process.env.NEXT_PUBLIC_MONNIFY_CONTRACT_CODE,
        redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-verification`,
        paymentMethods: ['CARD', 'ACCOUNT_TRANSFER'],
      }),
    },
  );

  const data = await response.json();
  return NextResponse.json(data);
}
