import { createAdminClient } from '../appwrite';
import { appwriteConfig } from '../appwrite/config';

const DATABASE_ID = appwriteConfig.databaseId;
const USERS_COLLECTION_ID = appwriteConfig.usersCollectionId;
const TRANSACTIONS_COLLECTION_ID = appwriteConfig.transactionsCollectionId;

export const addTransaction = async (transaction: {
  userId: string;
  amount: number;
  type: 'credit' | 'debit'; // Must be either 'credit' or 'debit'
  description?: string;
}) => {
  const { databases } = await createAdminClient();
  try {
    // Fetch the user by userId
    const user = await databases.getDocument(
      DATABASE_ID,
      USERS_COLLECTION_ID,
      transaction.userId,
    );
    console.log(user);

    if (!user) {
      throw new Error('User not found'); // Specific error message
    }

    // Calculate the new balance
    const currentBalance = user.balance || 0;
    const transactionsCount = user.transactionsCount;
    let newBalance = currentBalance;
    let newTransactionsCount = transactionsCount;

    if (transaction.type === 'credit') {
      newBalance += transaction.amount; // Add the amount for credit
    } else if (transaction.type === 'debit') {
      if (transaction.amount > currentBalance) {
        throw new Error('Insufficient balance for this transaction'); // Specific error for insufficient balance
      }
      newBalance -= transaction.amount; // Subtract the amount for debit
      newTransactionsCount += 1;
      console.log(newTransactionsCount);
    }

    // Update the user's balance
    const updatedBalance = await databases.updateDocument(
      DATABASE_ID,
      USERS_COLLECTION_ID,
      transaction.userId,
      {
        balance: newBalance,
        transactionsCount: newTransactionsCount, // Increment the transactions count by 1 for the new transaction
      },
    );
    console.log(updatedBalance);

    if (newTransactionsCount >= 3) {
      throw new Error('Limit Hit');
    }

    // Add the transaction to the transactions collection
    const response = await databases.createDocument(
      DATABASE_ID,
      TRANSACTIONS_COLLECTION_ID,
      'unique()', // Auto-generate a unique ID
      transaction,
    );

    return response;
  } catch (error: any) {
    if (error.message === 'User not found') {
      throw new Error('User not found. Please check the user ID.'); // Custom message
    } else if (error.message === 'Insufficient balance for this transaction') {
      throw new Error(
        'You do not have enough balance to complete this transaction.',
      );
    } else {
      throw new Error(
        error.message || 'An error occurred while processing the transaction.',
      );
    }
  }
};
