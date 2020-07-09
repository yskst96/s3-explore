import React from 'react';
import { CompositionProps } from '../Composition';
import { s3get } from '../aws';

const File: React.FC<CompositionProps> = ({ object, current }) => {
  const fileName = object.key.replace(current, '');

  return (
    <div
      className='composition'
      onClick={() => {
        s3get(object.key);
      }}
    >
      File:{fileName}
    </div>
  );
};

export { File };
