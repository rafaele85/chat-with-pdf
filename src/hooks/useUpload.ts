import {useState,} from 'react';
import {useUser,} from '@clerk/nextjs';
import {uuidv4,} from '@firebase/util';
import {ref, uploadBytesResumable,} from '@firebase/storage';
import {doc, setDoc,} from '@firebase/firestore';
import {db, storage,} from '@/firebase';
import {getDownloadURL,} from '@firebase/storage';
import {generateEmbeddings,} from '@/actions/generateEmbeddings';

// eslint-disable-next-line no-shadow
export enum StatusText {
  UPLOADING = 'Uploading File ...',
  UPLOADED = 'File uploaded successfully',
  SAVING = 'Saving file to database ...',
  GENERATING = 'Generating AI Embeddings. This will only take a few seconds...',
}

export type Status = StatusText[keyof StatusText];

export const useUpload = () => {
  const [
    progress,
    setProgress,
  ] = useState<number|null>(null);

  const [
    fileId,
    setFileId,
  ] = useState<string | null>(null);

  const [
    status,
    setStatus,
  ] = useState<StatusText | null>(null);

  const {user,} = useUser();

  const handleUpload = async (file: File) => {
    if (!file || !user) {
      return;
    }

    const fileIdToUpload = uuidv4();

    const storageRef = ref(
      storage,
      `/users/${user.id}/files/${fileIdToUpload}`
    );

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', (snapshot) => {
      const percent = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );

      setStatus(StatusText.UPLOADING);
      setProgress(percent);
    }, (error) => {
      // eslint-disable-next-line no-console
      console.log(error);
    }, async () => {
      setStatus(StatusText.UPLOADED);

      const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
      setStatus(StatusText.SAVING);
      await setDoc(doc(db, 'users', user.id, 'files', fileIdToUpload), {
        name: file.name,
        size: file.size,
        type: file.type,
        downloadUrl,
        ref: uploadTask.snapshot.ref.fullPath,
        createdAt: new Date(),
      });

      setStatus(StatusText.GENERATING);

      await generateEmbeddings(fileIdToUpload);

      setFileId(fileIdToUpload);
    });

  };

  return {progress,
    status,
    fileId,
    handleUpload,};
};