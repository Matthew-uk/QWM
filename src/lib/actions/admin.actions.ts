'use server';

import { ID, Query } from 'node-appwrite';
import { createAdminClient, createSessionClient } from '../appwrite';
import { appwriteConfig } from '../appwrite/config';
import { parseStringify } from '../utils';
import { cookies } from 'next/headers';

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

export const createAdminAccount = async ({
  fullName,
  email,
  password,
}: {
  fullName: string;
  email: string;
  password: string;
}) => {
  try {
    const adminExists = await getUserByEmail(email);

    if (adminExists) {
      throw new Error('Admin Already Exists');
    }

    const { account, databases } = await createAdminClient();

    const newAdminAccount = await account.create(
      ID.unique(),
      email,
      password,
      fullName,
    );

    const accountId = newAdminAccount.$id;

    await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.adminCollectionId,
      ID.unique(),
      {
        fullName,
        email,
        password,
        accountId,
        role: 'admin',
      },
    );

    return parseStringify({ accountId });
  } catch (error) {
    handleError(error, 'Error Creating New Admin Account');
  }
};

export const loginAdmin = async (email: string, password: string) => {
  try {
    const { account, databases } = await createAdminClient();
    const session = await account.createEmailPasswordSession(email, password);

    const admin = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.adminCollectionId,
      [Query.equal('email', email), Query.equal('role', 'admin')],
    );

    if (admin.total === 0) {
      throw new Error('Access Denied: Not an Admin');
    }

    const cookie = (await cookies()).set('appwrite-session', session.secret, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
    return { session };
  } catch (error) {
    handleError(error, 'Failed to login admin');
  }
};

export const listUsers = async () => {
  try {
    const { databases } = await createAdminClient();
    const users = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
    );
    console.log(users.documents);
    return users.documents;
  } catch (error) {
    handleError(error, 'Failed to fetch users');
  }
};

export const listTransactions = async () => {
  try {
    const { databases } = await createAdminClient();
    const users = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.transactionsCollectionId,
    );
    console.log(users.documents);
    return users.documents;
  } catch (error) {
    handleError(error, 'Failed to fetch users');
  }
};

export const deleteUser = async (userId: string) => {
  try {
    const { account, databases } = await createAdminClient();

    await account.deleteIdentity(userId);
    await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      userId,
    );

    return { success: true };
  } catch (error) {
    handleError(error, 'Error deleting user');
  }
};

export const updateUserDetails = async (
  userId: string,
  updatedData: Record<string, any>,
) => {
  try {
    const { databases } = await createAdminClient();

    const updatedUser = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      userId,
      updatedData,
    );

    return updatedUser;
  } catch (error) {
    handleError(error, 'Error updating user details');
  }
};
