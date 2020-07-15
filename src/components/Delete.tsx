import React from 'react';
import { s3delete } from '../util/aws';

type DeleteProps = {
  targets: Array<string>;
  afterDelete: () => void;
  cancel: () => void;
};

const Delete: React.FC<DeleteProps> = ({ targets, afterDelete, cancel }) => {
  const deleteObject = async () => {
    for (const key of targets) {
      await s3delete(key);
    }
    afterDelete();
  };

  return (
    <div>
      <div>以下のファイルを削除してよろしいですか？</div>
      <div>{targets.join('\n')}</div>
      <div>
        <button onClick={deleteObject}>はい</button>
        <button onClick={cancel}>キャンセル</button>
      </div>
    </div>
  );
};

export { Delete };
