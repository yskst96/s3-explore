import React from 'react';

type ButtonProps = {
  type: 'primary' | 'secondary';
  clickHandler: () => void;
};

const Button: React.FC<ButtonProps> = ({ type, children, clickHandler }) => {
  return (
    <button className={`my-button ${type}`} onClick={clickHandler}>
      {children}
    </button>
  );
};

export { Button };
