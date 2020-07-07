import React from 'react';
import AWS from 'aws-sdk';

type Props = {
  object: AWS.S3.Object;
};

const Folder: React.FC<Props> = ({ object }) => {
  const folderName = object.Key?.split('/').slice(-1)[0];

  return <div>{folderName}</div>;
};

export default Folder;
