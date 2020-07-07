import React, { useEffect, useState } from 'react';
import './App.css';

import { s3list } from './aws';
import { S3Object } from './Composition';

const App: React.FC = () => {
  const [list, setList] = useState([] as S3Object[]);
  const [current, setCurrent] = useState('');

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
      <div>current:{current ? current : '/'}</div>
      {list.map((o) => {
        return <div key={o.key}>{o.key}</div>;
      })}
    </div>
  );
};

export default App;
