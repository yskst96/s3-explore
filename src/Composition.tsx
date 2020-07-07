import React from 'react';
import AWS from 'aws-sdk';

type Props = {
  list: AWS.S3.ObjectList;
};

const Compostion: React.FC<Props> = ({ list }) => {
  return <div></div>;
};

const isFile = (object: AWS.S3.Object) => {};

export default Compostion;
