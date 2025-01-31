'use server';
import { Account, Client, Databases, Avatars, Storage } from 'node-appwrite';
import { appwriteConfig } from './config';
import { cookies } from 'next/headers';

export const createSessionClient = async () => {
  const client = new Client()
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId);
  const session = (await cookies()).get('appwrite-session');

  if (!session) {
    throw Error('Session cookie not found. User might not be authenticated.');
  }

  if (!session.value) {
    throw Error(
      `Session cookie found but value is invalid. Cookie: ${JSON.stringify(
        session,
      )}`,
    );
  }

  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
    get databases() {
      return new Databases(client);
    },
  };
};

export const createAdminClient = async () => {
  const client = new Client()
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setKey(appwriteConfig.secretKey);

  return {
    get account() {
      return new Account(client);
    },
    get databases() {
      return new Databases(client);
    },
    get avatars() {
      return new Avatars(client);
    },
    get storage() {
      return new Storage(client);
    },
  };
};
