import {Pinecone,} from '@pinecone-database/pinecone';

// eslint-disable-next-line no-process-env
const apiKey = process.env.PINECONE_API_KEY;
if (!apiKey) {
  throw new Error('PINECONE_API_KEY is missing');
}

export const pineconeClient = new Pinecone({
  apiKey,
});

