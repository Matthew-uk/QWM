'use server';
import Cookies from 'js-cookie';
import { ID, Query } from 'node-appwrite';
import { type Models } from 'appwrite';
import { createAdminClient, createSessionClient } from '../appwrite';
import { appwriteConfig } from '../appwrite/config';
import { generateReferralCode, parseStringify } from '../utils';
import { cookies } from 'next/headers';
import axios from 'axios';
import { NextResponse } from 'next/server';
import { TransactionsInterface } from '@/store/transaction';

const getUserByEmail = async (email: string) => {
  const { databases } = await createAdminClient();

  const result = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.usersCollectionId,
    [Query.equal('email', email)],
  );
  result.total > 0 && console.log(result);
  return result.total > 0 ? result.documents[0] : null;
};

const handleError = (error: unknown, message: string) => {
  console.log(error, message);
  throw error;
};

export const login = async (email: string, password: string) => {
  try {
    const { account } = await createAdminClient();
    const session = await account.createEmailPasswordSession(email, password);
    if (!session) {
      throw new Error('No session found!');
    }

    // Store session ID (not secret) in cookies
    (await cookies()).set('appwrite-session', session.secret, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Ensure secure in production
      sameSite: 'strict',
    });

    console.log('Session:', session);
    NextResponse.json(session);
    return { session };
  } catch (error) {
    handleError(error, 'Failed to login user');
  }
};

export const createAccount = async ({
  firstName,
  lastName,
  email,
  phoneNumber,
  password,
  referrer,
}: {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  referrer?: string;
}) => {
  try {
    const userExists = await getUserByEmail(email);
    if (userExists) {
      throw new Error('User Already Exists');
    }

    const { account, databases } = await createAdminClient();

    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      `${firstName} ${lastName}`,
    );
    const accountId = newAccount.$id;
    const referralCode = generateReferralCode();
    await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      ID.unique(),
      {
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        referralCode,
        referrer,
        accountId,
      },
    );

    return parseStringify({ accountId });
  } catch (error) {
    handleError(error, 'Error Creating New Account');
  }
};

export const getUser = async () => {
  try {
    const { account, databases } = await createSessionClient();
    const sessionId = (await cookies()).get('appwrite-session')?.value;

    if (!sessionId) {
      throw new Error('No session found. User is not authenticated.');
    }

    console.log('Using session:', sessionId);

    // Fetch the authenticated user's account
    const user = await account.get();
    const accountId = user.$id;

    const result = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal('accountId', accountId)],
    );

    return {
      firstName: result.documents[0]?.firstName || '',
      lastName: result.documents[0]?.lastName || '',
      email: result.documents[0]?.email || '',
      userId: result.documents[0]?.$id || '',
    };
  } catch (error) {
    console.error('Error fetching user or documents:', error);
    return null;
  }
};

// export const getUser = async () => {
//   try {
//     const response = await axios.get('/api/getUser');
//     return response.data;
//   } catch (error) {
//     handleError(error, 'Error getting User');
//   }
// };

interface UserDocument extends Models.Document {
  firstName: string;
  lastName: string;
  balance: number;
  email: string;
  phoneNumber: string;
  referralCode: string;
}

export const updateUserBalance = async (
  userId: string,
  amount: number,
): Promise<UserDocument> => {
  const { databases } = await createSessionClient();
  try {
    console.log(`Updating balance for user: ${userId} with amount: ${amount}`);
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal('accountId', userId)],
    );
    console.log(response);

    if (response.documents.length === 0) {
      throw new Error('User document not found');
    }

    const userDoc = response.documents[0] as UserDocument;
    const newBalance = userDoc.balance + amount;

    // Update the balance
    const updatedDoc = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      userDoc.$id,
      { balance: newBalance },
    );

    return updatedDoc as UserDocument;
  } catch (error) {
    console.error('Balance update failed:', error);
    throw error;
  }
};

export const investment = async (
  userId: string,
  amount: number,
  price: number,
) => {
  const { databases } = await createSessionClient();
  try {
    console.log(`Updating balance for user: ${userId} with amount: ${amount}`);
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal('accountId', userId)],
    );
    console.log(response);

    if (response.documents.length === 0) {
      throw new Error('User document not found');
    }

    const userDoc = response.documents[0] as UserDocument;
    const newBalance = userDoc.balance - price;

    // Update the balance
    const updatedDoc = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      userDoc.$id,
      { dailyInvestment: amount, investmentDuration: 20, balance: newBalance },
    );

    return updatedDoc as UserDocument;
  } catch (error) {
    console.error('Balance update failed:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const sessionCookie = (await cookies()).get('appwrite-session');
    if (!sessionCookie) throw new Error('No active session found');

    const { account } = await createSessionClient(); // User-scoped client
    const result = await account.deleteSessions();
    console.log('Logged out:', result);

    (await cookies()).delete('appwrite-session'); // Clear session cookie
  } catch (error) {
    handleError(error, 'Error logging out');
  }
};

export const createWithdrawal = async ({
  userId,
  accountName,
  bankName,
  amount,
  accountNumber,
  email,
}: {
  userId: string;
  accountName: string;
  bankName: string;
  amount: number;
  email: string;
  accountNumber: number;
}) => {
  try {
    // const userExists = await getUserByEmail(email);
    // if (userExists) {
    //   throw new Error('User Already Exists');
    // }

    const { databases } = await createAdminClient();

    // const newAccount = await account.create(
    //   ID.unique(),
    //   email,
    //   password,
    //   `${firstName} ${lastName}`,
    // );
    // const accountId = newAccount.$id;
    // const referralCode = generateReferralCode();
    const newWithdrawal = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.withdrawalCollectionId,
      ID.unique(),
      {
        userId,
        accountName,
        bankName,
        amount,
        accountNumber,
      },
    );

    return parseStringify({ newWithdrawal });
  } catch (error) {
    handleError(error, 'Error Creating New Account');
  }
};

export const getWithdrawals = async (accountId: string) => {
  try {
    const { databases } = await createSessionClient();

    const result = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.withdrawalCollectionId,
      [Query.equal('userId', accountId)],
    );
    return result.documents;
  } catch (error) {
    console.error('Error fetching user or documents:', error);
    return null;
  }
};

interface TransactionDocument extends Models.Document {
  completed: boolean;
}

export const approveWithdrawal = async (
  userId: string,
  withdrawalId: string,
  amount: number,
): Promise<TransactionDocument> => {
  const { databases } = await createSessionClient();
  try {
    console.log(
      `Updating transaction for user: ${userId} with ID: ${withdrawalId}`,
    );

    // Update the 'completed' field of the transaction document
    const updatedDoc = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.withdrawalCollectionId,
      withdrawalId,
      { completed: true },
    );

    // Handle user account reduction:
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal('accountId', userId)],
    );
    console.log(response);

    if (response.documents.length === 0) {
      throw new Error('User document not found');
    }

    const userDoc = response.documents[0] as UserDocument;
    const newBalance = userDoc.balance - amount;

    // Update the balance
    const updatedUser = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      userDoc.$id,
      { balance: newBalance },
    );

    console.log('Transaction updated successfully:', updatedDoc, updatedUser);
    return updatedDoc as TransactionDocument;
  } catch (error) {
    console.error('Transaction update failed:', error);
    throw error;
  }
};
