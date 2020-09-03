import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import './css/App.css';

import { s3list, s3put } from './util/aws';
import { S3Object, composition } from './components/Composition';
import { Upload } from './components/Upload';
import { Refresh } from './components/Refresh';
import { Delete } from './components/Delete';
import { Breadcrumbs } from './components/Breadcrumbs';
import { Snackbar, SnackbarContent } from '@material-ui/core';

Modal.setAppElement('#root');
const customStyles = {
  content: {
    top: '15%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,.5)',
  },
};
let i = 0;
const App: React.FC = () => {
  const [list, setList] = useState([] as S3Object[]);
  const [current, setCurrent] = useState('');

  // SnackBar
  const [snackBarOpen, setSnackBar] = useState(false);

  //ファイル一覧更新
  const updateList = async (prefix?: string) => {
    prefix = prefix || '';

    const list = await s3list(prefix);
    setList(list);
    setCurrent(prefix);
  };

  // 副作用(初期処理)
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

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteTargets, setDeleteTargets] = useState([] as Array<string>);

  // モーダル
  const openDeleteModal = (target: string) => {
    setDeleteTargets([target]);
    setDeleteOpen(true);
    console.log('delete open');
  };

  const closeDeleteModal = (refresh: boolean) => {
    if (refresh) {
      updateList(current);
    }
    setDeleteOpen(false);
  };

  // ドラッグ処理
  const [dragOver, setDragOver] = useState(false);

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    const files = e.dataTransfer.files;

    if (!files) return;

    for (const file of Array.from(files)) {
      const reader = new FileReader();
      reader.onload = async (event: ProgressEvent<FileReader>) => {
        const r = event.target?.result;

        if (typeof r === 'string' || !r) return;

        await s3put(current + file.name, new Uint8Array(r));

        await updateList(current);

        setSnackBar(true);
      };

      reader.onerror = (event: ProgressEvent<FileReader>) => {
        console.log('ERR', event.target?.error);
        alert(`アップロードに失敗しました:${file.name}`);
      };

      reader.readAsArrayBuffer(file);
    }

    i = 0;
    setDragOver(false);
  };

  const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    ++i;

    if (!dragOver) setDragOver(true);
  };

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    --i;

    if (dragOver && i === 0) setDragOver(false);
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <div className='App'>
      <Breadcrumbs current={current ? current : '/'} updateList={updateList}></Breadcrumbs>
      <div className='header'>
        <Refresh current={current} updateList={updateList}></Refresh>
        <div className='space'></div>
        <Upload current={current} updateList={updateList} onUploadComlate={() => setSnackBar(true)}></Upload>
      </div>

      <div className={['composition-container', dragOver ? 'drag-over' : ''].join(' ')} onDrop={onDrop} onDragEnter={onDragEnter} onDragLeave={onDragLeave} onDragOver={onDragOver}>
        {list.map((o) => {
          return (
            <div className='object-container' key={o.key}>
              <div>{composition(o)({ object: o, current, updateList, openDeleteModal })}</div>
            </div>
          );
        })}
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={snackBarOpen}
        onClose={() => setSnackBar(false)}
        autoHideDuration={3000}
      >
        <SnackbarContent message={'アップロードが完了しました！'} style={{ backgroundColor: '#3e5fde' }} />
      </Snackbar>
      <Modal isOpen={deleteOpen} contentLabel='削除' style={customStyles}>
        <Delete
          targets={deleteTargets}
          cancel={() => {
            closeDeleteModal(false);
          }}
          afterDelete={() => {
            closeDeleteModal(true);
          }}
        ></Delete>
      </Modal>
    </div>
  );
};

export default App;
