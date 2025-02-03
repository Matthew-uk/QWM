// app/api/cron/route.ts
import { createSessionClient } from '@/lib/appwrite';
import { appwriteConfig } from '@/lib/appwrite/config';
import { NextResponse } from 'next/server';
import { Query } from 'node-appwrite';

export async function GET() {
  try {
    // Create your session client, which provides both the account and databases clients
    const { account, databases } = await createSessionClient();

    // Retrieve the current account details. We'll use its $id as the userId.
    const accountDetails = await account.get();
    const userId = accountDetails.$id; // Alternatively, if you have a dedicated field, use that.

    // Define the amount to add (this could come from any logic or be hard-coded for testing)
    const amount = 5000000; // For example, add 100 units

    console.log(`Updating balance for user: ${userId} with amount: ${amount}`);

    // Query your database for the user document where the 'accountId' field matches userId.
    const response = await databases.listDocuments(
      appwriteConfig.databaseId, // Your Appwrite Database ID
      appwriteConfig.usersCollectionId, // Your Collection ID (users collection)
      [Query.equal('accountId', userId)],
    );

    console.log(response);

    if (response.documents.length === 0) {
      throw new Error('User document not found');
    }

    // Take the first matching document.
    const userDoc = response.documents[0];
    // Calculate the new balance by adding the amount to the existing balance.
    const newBalance = userDoc.balance + amount;

    // Update the document with the new balance.
    const updatedDoc = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      userDoc.$id,
      { balance: newBalance },
    );

    console.log(
      `Balance updated for user ${userId}: new balance is ${newBalance}`,
    );
    return NextResponse.json(
      { success: true, data: updatedDoc, timestamp: new Date().toISOString() },
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
