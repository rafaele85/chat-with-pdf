'use client';

import {useCallback,} from 'react';
import {useDropzone,} from 'react-dropzone';
import {CircleArrowDown, RocketIcon,} from 'lucide-react';

export const FileUploader = () => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
  }, []);
  const drop = useDropzone({onDrop,});

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
  return (
    <div className={'flex flex-col gap-4 items-center max-w-7xl mx-auto'}>
      <div {...rootProps} className={`p-10 border-2 border-dashed border-indigo-600 mt-10 w-[90%] text-indigo-600 rounded-lg h-96 flex items-center justify-center ${isActiveClass}`}>
        <input {...inputProps} />
        <div className={'flex items-center justify-center'}>
          {jsxMessage}
        </div>
      </div>
    </div>
  );
};
