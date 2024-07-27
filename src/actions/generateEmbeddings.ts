'use server';

import {auth,} from '@clerk/nextjs/server';
import {revalidatePath,} from 'next/cache';
import {generateEmbeddingsInPineconeVectorStore,} from '@/lib/langchain';

export const generateEmbeddings = async (docId: string) => {
  auth().protect();

  await generateEmbeddingsInPineconeVectorStore(docId);

  revalidatePath('/dashboard');

  return {completed: true,};
};