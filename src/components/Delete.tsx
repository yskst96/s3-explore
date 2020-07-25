import React from 'react';
import { s3delete } from '../util/aws';
import { Button } from '../components/Button';

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
    <div className='delete-confirm'>
      <div>以下のファイルを削除してよろしいですか？</div>
      <div>{targets.join('\n')}</div>
      <div className='confirm-button'>
        <Button type='primary' clickHandler={deleteObject}>
          はい
        </Button>
        <Button type='primary' clickHandler={cancel}>
          キャンセル
        </Button>
      </div>
    </div>
  );
};

export { Delete };
