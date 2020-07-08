import React from 'react';
import { CompositionProps } from './Composition';

const File: React.FC<CompositionProps> = ({ object }) => {
  const fileName = object.key;

  return <div className='composition'>File:{fileName}</div>;
};

export { File };
