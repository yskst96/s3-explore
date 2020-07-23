import React from 'react';
//import icon from '../assets/refresh.svg';

type RefreshProps = {
  current: string;
  updateList: (prefix?: string) => Promise<void>;
};

const Refresh: React.FC<RefreshProps> = ({ current, updateList }) => {
  return (
    <div
      className='refresh'
      onClick={async () => {
        await updateList(current);
      }}
    >
      Refresh
      {/* <img className='refresh-icon' src={icon} alt='' /> */}
    </div>
  );
};

export { Refresh };
