import React, {useCallback} from 'react';
import {useDropzone} from 'react-dropzone';
import { notify } from '../state/helpers/flash-messages';
import { startWaiting, stopWaiting } from '../state/helpers/waits';
import './Dropzone.css';

function Dropzone(props: Props) {
  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach((file: Blob) => {
      assertSize(file);
      const reader = new FileReader();

      reader.onabort = () => {
        stopWaiting();
        console.warn('file reading was aborted');
      };
      reader.onerror = () => {
        stopWaiting();
        console.error('file reading has failed');
      };
      reader.onload = () => {
        const str = (reader.result as string);
        stopWaiting();

        props.onFileRead(str);
      };

      startWaiting();
      reader.readAsText(file);
    });

  }, []);
  const {getRootProps, getInputProps} = useDropzone({onDrop: onDrop, accept: '.tcx,.xml'});

  return (
    <div className='dropzone' {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop tcx track here, or click to select files</p>
      <p className='import-invitation'>or import a workout from <a onClick={props.toggleSource}>strava</a></p>
    </div>
  );
}

const MEGABYTE = 2 ** 20;
const SIZE_LIMIT = 10 * MEGABYTE;

function assertSize(file: Blob) {
  if (file.size > SIZE_LIMIT) {
    notify(`This file is ${Math.floor(file.size/MEGABYTE)} MB. That's a bit too large for a tcx track, sorry`);
    throw new Error('File size too large');
  }
}

interface Props {
  onFileRead: (content: string) => void,
  toggleSource: (event: React.MouseEvent<HTMLElement>) => void
}

export default Dropzone;
