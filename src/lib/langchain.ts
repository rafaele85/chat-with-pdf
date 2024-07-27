import {ChatOpenAI, OpenAIEmbeddings,} from '@langchain/openai';
import {auth,} from '@clerk/nextjs/server';
import {pineconeClient,} from '@/lib/pinecone';
import {Index, RecordMetadata,} from '@pinecone-database/pinecone';
import {PineconeStore,} from '@langchain/pinecone';
import {adminDb,} from '@/firebaseAdmin';
import {PDFLoader,} from '@langchain/community/document_loaders/fs/pdf';
import {RecursiveCharacterTextSplitter,} from '@langchain/textsplitters';

// eslint-disable-next-line no-process-env
const apiKey = process.env.OPEN_AI_API_KEY;

const model = new ChatOpenAI({
  apiKey,
  modelName: 'gpt-4o',
});

const namespaceExists = async (index: Index<RecordMetadata>, namespace: string) => {
  if (namespace === null) {
    throw new Error('Namespace value not provided');
  }

  const {namespaces,} = await index.describeIndexStats();
  return namespaces?.[namespace] !== undefined;
};

const generateDocs = async (docId: string) => {
  const firebaseRef = await adminDb.doc(docId).get();
  const downloadUrl = firebaseRef.data()?.downloadUrl;

  if (!downloadUrl) {
    throw new Error('Download URL not found');
  }

  const response = await fetch(downloadUrl);

  const data = await response.blob();

  const loader = new PDFLoader(data);
  const docs = await loader.load();
  const splitter = new RecursiveCharacterTextSplitter();
  const splitDocs = await splitter.splitDocuments(docs);

  return splitDocs;
};

export const indexName = 'chat-with-pdf';

export const generateEmbeddingsInPineconeVectorStore = async (docId: string) => {
  const {userId,} = await auth();

  if (!userId) {
    throw new Error('UserId not found');
  }

  let pineconeVectorStore;

  const embeddings = new OpenAIEmbeddings();
  const index = pineconeClient.index(indexName);
  const namespaceAlreadyExists = await namespaceExists(index, docId);


  if (namespaceAlreadyExists) {
    pineconeVectorStore = await PineconeStore.fromExistingIndex(embeddings, {
      pineconeIndex: index,
      namespace: docId,
    });

    return pineconeVectorStore;
  }

  const splitDocs = await generateDocs(docId);

  pineconeVectorStore = await PineconeStore.fromDocuments(splitDocs, embeddings, {
    pineconeIndex: index,
    namespace: docId,
  });

  return pineconeVectorStore;
};