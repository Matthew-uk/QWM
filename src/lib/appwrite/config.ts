export const appwriteConfig = {
  endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!,
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT!,
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
  usersCollectionId: process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION!,
  adminCollectionId: process.env.NEXT_PUBLIC_APPWRITE_ADMIN_COLLECTION!,
  depositCollectionId: process.env.NEXT_PUBLIC_APPWRITE_DEPOSITS_COLLECTION!,
  withdrawalCollectionId:
    process.env.NEXT_PUBLIC_APPWRITE_WITHDRAWALS_COLLECTION!,
  transactionsCollectionId:
    process.env.NEXT_PUBLIC_APPWRITE_TRANSACTIONS_COLLECTION!,
  bucketId: process.env.NEXT_PUBLIC_APPWRITE_BUCKET!,
  secretKey: process.env.NEXT_APPWRITE_KEY!,
};
