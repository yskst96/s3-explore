import React, { useState } from 'react';
import icon from '../assets/refresh.svg';

type RefreshProps = {
  updateList: (prefix?: string) => Promise<void>;
};

const Refresh: React.FC<RefreshProps> = ({ updateList }) => {
  return (
    <div
      className='refresh'
      onClick={async () => {
        await updateList();
      }}
    >
      Refresh
      {/* <img className='refresh-icon' src={icon} alt='' /> */}
    </div>
  );
};

export { Refresh };
