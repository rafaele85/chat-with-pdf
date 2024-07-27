'use client';

import React, {CSSProperties, ReactNode, useCallback, useEffect,} from 'react';
import {useDropzone,} from 'react-dropzone';
import {CheckCircleIcon, CircleArrowDown, HammerIcon, RocketIcon, SaveIcon,} from 'lucide-react';
import {StatusText, useUpload,} from '@/hooks/useUpload';
import {useRouter,} from 'next/navigation';

const statusIcons: Record<StatusText, ReactNode> = {
  [StatusText.UPLOADING]: <HammerIcon className={'text-indigo-600 h-20 w-20 animate-spin'} />,
  [StatusText.UPLOADED]: <CheckCircleIcon className={'text-indigo-600 h-20 w-20'} />,
  [StatusText.SAVING]: <SaveIcon className={'text-indigo-600 h-20 w-20 animate-spin'} />,
  [StatusText.GENERATING]: <RocketIcon className={'text-indigo-600 h-20 w-20 animate-spin'} />,
};

export const FileUploader = () => {

  const {fileId, handleUpload, progress, status,} = useUpload();

  const router = useRouter();

  useEffect(() => {
    if (fileId) {
      router.push(`/dashboard/files/${fileId}`);
    }
  }, [
    fileId,
    router,
  ]);


  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const [file,] = acceptedFiles;
    if (file) {
      await handleUpload(file);
    }
  }, [handleUpload,]);
  const drop = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      'application/pdf': ['.pdf',],
    },
  });

  const rootProps = drop.getRootProps();
  const inputProps = drop.getInputProps();
  let jsxMessage;
  if (drop.isDragActive) {
    jsxMessage = (
      <p>
        <RocketIcon className={'h-20 w-20 animate-ping'} />
          Drop the files here...
      </p>

    );
  } else {
    jsxMessage = (
      <p>
        <CircleArrowDown className={'h-20 w-20 animate-bounce'} />
        Drag-n-drop files here, or click to select file
      </p>
    );
  }
  const isActiveClass = (drop.isFocused || drop.isDragActive) ? 'bg-indigo-300' : 'bg-indigo-100';

  const uploadInProgress = progress !== null && progress >= 0 && progress <= 100;
  let jsxProgress;

  if (uploadInProgress) {
    const isHidden = (progress === 100 && 'hidden');
    const style = {
      '--value': progress,
      '--size': '12rem',
      '--thickness': '1.3rem',
    } as unknown as CSSProperties;

    let jsxStatusIcon;

    if (status) {
      jsxStatusIcon = statusIcons[status];
    }

    jsxProgress = (
      <div>
        <div
          className={`radial-progress bg-indigo-600 text-white border-indigo-600 border-4 ${isHidden}`}
          role={'progressbar'}
          style={style}
        >
          {progress} %
        </div>
        {jsxStatusIcon}
        <p className={'text-indigo-600 animate-pulse'}> {String(status || '')} </p>
      </div>
    );
  } else {
    jsxProgress = (
      <div {...rootProps}
        className={`p-10 border-2 border-dashed border-indigo-600 mt-10 w-[90%] text-indigo-600 rounded-lg h-96 flex items-center justify-center ${isActiveClass}`}>
        <input {...inputProps} />
        <div className={'flex items-center justify-center'}>
          {jsxMessage}
        </div>
      </div>
    );
  }
  return (
    <div className={'flex flex-col gap-4 items-center max-w-7xl mx-auto'}>
      {jsxProgress}
    </div>
  );
};
