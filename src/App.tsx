import React, { useEffect, useState } from 'react';
import './App.css';

import { s3list } from './aws';
import { S3Object, composition } from './Composition';

const App: React.FC = () => {
  const [list, setList] = useState([] as S3Object[]);
  const [current, setCurrent] = useState('');

  const updateList = async (prefix: string) => {
    const list = await s3list(prefix);
    setList(list);
    setCurrent(prefix);
  };

  useEffect(() => {
    let unmounted = false;

    (async () => {
      const list = await s3list();

      if (!unmounted) {
        setList(list);
      }
    })();

    return () => {
      unmounted = true;
    };
  }, []);

  return (
    <div className='App'>
      <div className='current-path'>current:{current ? current : '/'}</div>
      {list.map((o) => {
        return <div key={o.key}>{composition(o)({ object: o, current, updateList })}</div>;
      })}
    </div>
  );
};

export default App;
