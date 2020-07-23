import React from 'react';
import { Button } from './Button';
import icon from '../assets/refresh.svg';

type RefreshProps = {
  current: string;
  updateList: (prefix?: string) => Promise<void>;
};

const Refresh: React.FC<RefreshProps> = ({ current, updateList }) => {
  return (
    <Button
      type='primary'
      clickHandler={() => {
        updateList(current);
      }}
    >
      <div className='refresh'>
        Refresh
        {<img className='refresh-icon' src={icon} alt='refresh' />}
      </div>
    </Button>
  );
};

export { Refresh };
