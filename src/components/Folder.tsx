import React from 'react';
import { CompositionProps } from './Composition';
import icon from '../assets/folder.svg';

const Folder: React.FC<CompositionProps> = ({ object, current, updateList }) => {
  const folderName = object.key.replace(current, '').replace('/', '');

  return (
    <div
      className='composition'
      onClick={() => {
        updateList(object.key);
      }}
    >
      <img className='folder-icon' src={icon} alt='folder' />
      <span>{folderName}</span>
    </div>
  );
};

export default Folder;
