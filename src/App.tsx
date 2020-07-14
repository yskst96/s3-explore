import React, { useEffect, useState } from 'react';
import './css/App.css';

import { s3list } from './util/aws';
import { S3Object, composition } from './components/Composition';
import { Upload } from './components/Upload';
import { Refresh } from './components/Refresh';

const App: React.FC = () => {
  const [list, setList] = useState([] as S3Object[]);
  const [current, setCurrent] = useState('');

  const updateList = async (prefix?: string) => {
    prefix = prefix || '';

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
      <div className='header'>
        <div className='current-path'>current:{current ? current : '/'}</div>
        <Refresh updateList={updateList}></Refresh>
      </div>
      <div>
        <Upload current={current}></Upload>
      </div>

      {list.map((o) => {
        return <div key={o.key}>{composition(o)({ object: o, current, updateList })}</div>;
      })}
    </div>
  );
};

export default App;
