import React, {useCallback} from 'react';
import {useDropzone} from 'react-dropzone';
import { startWaiting, stopWaiting } from '../state/helpers/waits';
import './Dropzone.css';

function Dropzone(props: Props) {
  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach((file: Blob) => {
      const reader = new FileReader();

      reader.onabort = () => {
        stopWaiting();
        console.log('file reading was aborted');
      };
      reader.onerror = () => {
        stopWaiting();
        console.log('file reading has failed');
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

interface Props {
  onFileRead: (content: string) => void,
  toggleSource: (event: React.MouseEvent<HTMLElement>) => void
}

export default Dropzone;
