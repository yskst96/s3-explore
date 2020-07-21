import React from 'react';
import { CompositionProps } from './Composition';
import { s3get } from '../util/aws';
import icon from '../assets/file.svg';

const File: React.FC<CompositionProps> = ({ object, current }) => {
  const fileName = object.key.replace(current, '');

  return (
    <div
      className='composition'
      onClick={() => {
        s3get(object.key);
      }}
    >
      <img className='file-icon' src={icon} alt='file' />
      <span>{fileName}</span>
    </div>
  );
};

export { File };
