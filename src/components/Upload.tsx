import React, { useRef } from 'react';
import { s3put } from '../aws';

type UploadProp = {
  current: string;
};

const Upload: React.FC<UploadProp> = ({ current }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const onClick = () => {
    const input = inputRef.current;
    if (input) {
      console.log(current);
      input.click();
    }
  };
  const upload = () => {
    console.log(inputRef.current?.value, inputRef.current?.files);
  };

  return (
    <div>
      <button onClick={onClick}>upload</button>
      <input id='upload-form' className='upload-form' type='file' onChange={upload} ref={inputRef} />
    </div>
  );
};

export { Upload };
