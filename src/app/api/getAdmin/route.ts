import { NextResponse } from 'next/server';
import { createSessionClient } from '@/lib/appwrite';
import { Query } from 'appwrite';
import { appwriteConfig } from '@/lib/appwrite/config';

export const GET = async () => {
  try {
    const { account, databases } = await createSessionClient();

    // Fetch the authenticated user's account
    const user = await account.get();
    if (!user?.$id) {
      throw new Error('Unauthorized - No valid user session');
    }
    const accountId = user.$id;
    console.log(accountId);

    // Query the database for documents matching the accountId
    const result = await databases.listDocuments(
      appwriteConfig.databaseId, // Your database ID
      appwriteConfig.adminCollectionId, // Your collection ID
      [Query.equal('role', 'admin'), Query.equal('accountId', accountId)], // Filter for the user's accountId
    );
    console.log(result);

    // Return user and documents
    return NextResponse.json({
      documents: result.documents,
      //   originalDocs: result.documents,
    });
  } catch (error: any) {
    console.error('Error fetching admin:', error.message);
    return NextResponse.json(
      { error: 'Failed to fetch admin' },
      { status: 500 },
    );
  }
};
