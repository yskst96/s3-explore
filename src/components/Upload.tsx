import React, { useRef } from 'react';
import { s3put } from '../util/aws';

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

    const files = inputRef.current?.files;

    if (!files) return;

    const file = files[0];

    const reader = new FileReader();

    reader.onload = (event: ProgressEvent<FileReader>) => {
      const r = event.target?.result;

      if (typeof r === 'string' || !r) return;

      s3put(file.name, new Uint8Array(r));
    };

    reader.onerror = (event: ProgressEvent<FileReader>) => {
      console.log('ERR', event.target?.error);
      alert('アップロードに失敗しました');
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <button onClick={onClick}>upload</button>
      <input id='upload-form' className='upload-form' type='file' onChange={upload} ref={inputRef} />
    </div>
  );
};

export { Upload };
