import React from 'react';

type Props = {
  object: AWS.S3.Object;
};

const File: React.FC<Props> = ({ object }) => {
  const fileName = object.Key?.split('/').slice(-1)[0];

  return <div>{fileName}</div>;
};

export default File;
