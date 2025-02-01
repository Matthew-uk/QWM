export const appwriteConfig = {
  endpoint: process.env.APPWRITE_ENDPOINT!,
  projectId: process.env.APPWRITE_PROJECT!,
  databaseId: process.env.APPWRITE_DATABASE!,
  usersCollectionId: process.env.APPWRITE_USERS_COLLECTION!,
  adminCollectionId: process.env.APPWRITE_ADMIN_COLLECTION!,
  transactionsCollectionId: process.env.APPWRITE_TRANSACTIONS_COLLECTION!,
  bucketId: process.env.APPWRITE_BUCKET!,
  secretKey: process.env.NEXT_APPWRITE_KEY!,
};
