import React from 'react';
type DeleteProps = {
  current: string;
  updateList: (prefix?: string) => Promise<void>;
};

const Breadcrumbs: React.FC<DeleteProps> = ({ current, updateList }) => {
  const pathList = ['/', ...current.split('/')].filter((p) => p !== '');

  console.log(pathList);

  const moveTo = async (i: number) => {
    if (i === 0) {
      await updateList();
      return;
    }
    const to = pathList.slice(1, i + 1).join('/') + '/';

    if (to === current) return;

    await updateList(to);
  };

  return (
    <div className='breadcrumbs'>
      {pathList.map((p, i) => {
        return (
          <div key={i}>
            <div>
              {i === 0 ? '' : '>'}
              <span
                className='link'
                onClick={async () => {
                  await moveTo(i);
                }}
              >
                {' '}
                {p}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export { Breadcrumbs };
