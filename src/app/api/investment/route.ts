import { appwriteConfig } from '@/lib/appwrite/config';
import { NextResponse } from 'next/server';
import { Client, Databases } from 'node-appwrite';

export async function GET() {
  const client = new Client();

  client
    .setEndpoint(appwriteConfig.endpoint) // Your Appwrite endpoint
    .setProject(appwriteConfig.projectId) // Your project ID
    .setKey(appwriteConfig.secretKey); // Your API key

  const databases = new Databases(client);

  try {
    // Fetch all user documents
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
    );

    const users = response.documents;

    // Iterate through each user document
    for (const user of users) {
      const dailyInvestment = user.dailyInvestment || 0;
      const currentBalance = user.balance || 0;
      const newBalance = currentBalance + dailyInvestment;
      const currentInvestmentDuration = user.investmentDuration;
      if (currentInvestmentDuration > 0) {
        const newDuration = Math.max(0, currentInvestmentDuration - 1);
        console.log(newDuration);

        // Update the user's balance
        const verifyUpdate = await databases.updateDocument(
          appwriteConfig.databaseId,
          appwriteConfig.usersCollectionId,
          user.$id,
          { balance: newBalance, investmentDuration: newDuration },
        );
        console.log(verifyUpdate);
      }
    }

    return NextResponse.json(
      { success: true, message: 'Balances updated successfully.' },
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
