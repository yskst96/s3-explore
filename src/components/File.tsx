import React from 'react';
import { CompositionProps } from './Composition';
import { s3get } from '../util/aws';
import icon from '../assets/file.svg';
import deleteIcon from '../assets/delete.svg';

const File: React.FC<CompositionProps> = ({ object, current, openDeleteModal }) => {
  const fileName = object.key.replace(current, '');

  return (
    <div>
      <div className='composition'>
        <img className='file-icon' src={icon} alt='file' />
        <span
          onClick={() => {
            s3get(object.key);
          }}
        >
          {fileName}
        </span>
        <img
          className='delete-icon'
          onClick={() => {
            openDeleteModal(object.key);
          }}
          src={deleteIcon}
          alt='delete'
        />
        <div className='last-modified'>最終更新:{object.lastModified}</div>
      </div>
    </div>
  );
};

export { File };
