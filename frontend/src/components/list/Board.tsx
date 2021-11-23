import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { withLayout } from '../../layout/Layout';
import API from '../../api/Repo';
import List, { IList } from './List';

interface IBoard {
  name: string;
  id: string;
  lists: IList[];
}
const Board = (): JSX.Element => {
  const { id } = useParams();
  const [lists, setLists] = useState<IList[]>([]);
  const [repoName, setRepoName] = useState('');
  useEffect(() => {
    const getRepoDetail = async () => {
      if (id) {
        const res = await API.getItem<IBoard>(id);
        setLists(res.lists);
        setRepoName(res.name);
      }
    };
    getRepoDetail();
  }, []);
  return (
    <div>
      <h1 className="h1 mb-5">Board: {repoName}</h1>
      <div className="grid grid-cols-4 gap-6">
        {lists.map((list) => {
          return <List {...list} key={list.id} />;
        })}
      </div>
    </div>
  );
};

export default withLayout(Board);
