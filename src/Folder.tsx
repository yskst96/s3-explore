import React from 'react';
import { CompositionProps } from './Composition';

const Folder: React.FC<CompositionProps> = ({ object, current, updateList }) => {
  const folderName = object.key.replace(current, '');

  return (
    <div
      className='composition'
      onClick={() => {
        updateList(object.key);
      }}
    >
      Folder:{folderName}
    </div>
  );
};

export default Folder;
