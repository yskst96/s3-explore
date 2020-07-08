import React from 'react';
import { CompositionProps } from './Composition';

const Folder: React.FC<CompositionProps> = ({ object, updateList }) => {
  const folderName = object.key.replace('/', '');

  return <div className='composition'>Folder:{folderName}</div>;
};

export default Folder;
