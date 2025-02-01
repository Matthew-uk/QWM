import { NextResponse } from 'next/server';
import { createSessionClient } from '@/lib/appwrite';
import { Query, type Models } from 'appwrite';
import { appwriteConfig } from '@/lib/appwrite/config';
import { parseStringify } from '@/lib/utils';

// Type definitions for better type safety
interface UserDocument extends Models.Document {
  firstName: string;
  lastName: string;
  balance: number;
  email: string;
  phoneNumber: string;
  referralCode: string;
}

interface UserResponse {
  documents: UserDocument[];
  userId: string;
}

export const GET = async (): Promise<NextResponse> => {
  try {
    const { account, databases } = await createSessionClient();

    // Get authenticated user
    const user = await account.get();
    if (!user?.$id) {
      throw new Error('Unauthorized - No valid user session');
    }

    // Construct query parameters
    const query = [Query.equal('accountId', user.$id)];

    // Fetch user documents
    const result = await databases.listDocuments<UserDocument>(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      query,
    );

    // Validate and transform response
    if (!result.documents) {
      throw new Error('No documents found for user');
    }

    // Create safe response object
    const responseData: UserResponse = {
      documents: result.documents.map(transformDocument),
      userId: user.$id,
    };

    return NextResponse.json({
      success: true,
      data: parseStringify(responseData),
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';

    console.error('[USER_API_ERROR]', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch user data',
        details:
          process.env.NODE_ENV === 'development' ? errorMessage : undefined,
      },
      {
        status:
          error instanceof Error && error.message.includes('Unauthorized')
            ? 401
            : 500,
      },
    );
  }
};

// Helper function for document transformation
const transformDocument = (doc: UserDocument): UserDocument => ({
  ...doc,
  userId: doc.$id,
});
