import React, { useRef } from 'react';
import { s3put } from '../util/aws';
import { Button } from './Button';
import icon from '../assets/upload.svg';

type UploadProp = {
  current: string;
  updateList: (prefix: string) => Promise<void>;
};

const Upload: React.FC<UploadProp> = ({ current, updateList }) => {
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

    reader.onload = async (event: ProgressEvent<FileReader>) => {
      const r = event.target?.result;

      if (typeof r === 'string' || !r) return;

      await s3put(current + file.name, new Uint8Array(r));

      await updateList(current);
    };

    reader.onerror = (event: ProgressEvent<FileReader>) => {
      console.log('ERR', event.target?.error);
      alert('アップロードに失敗しました');
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <Button type='secondary' clickHandler={onClick}>
        <div className='upload'>
          Upload
          {<img className='upload-icon' src={icon} alt='refresh' />}
        </div>
      </Button>
      <input id='upload-form' className='upload-form' type='file' multiple onChange={upload} ref={inputRef} />
    </div>
  );
};

export { Upload };
