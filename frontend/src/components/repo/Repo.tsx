import React, { useEffect, useState } from 'react';
import { withLayout } from '../../layout/Layout';
import API from '../../api/Repo';
import RepoDetail from './RepoDetail';
import RepoForm from './RepoForm';

export interface IRepo {
  id: string;
  name: string;
}

const Repo = (): JSX.Element => {
  const [repos, setRepos] = useState<IRepo[]>([]);
  useEffect(() => {
    const getItems = async (): Promise<void> => {
      const res = await API.getItems<{ repos: IRepo[] }>();
      setRepos(res.repos);
    };
    getItems();
  }, []);
  return (
    <>
      <h1 className="font-bold text-3xl px-4">Repo List</h1>
      <div>
        {repos.map((item) => {
          return <RepoDetail {...item} key={`repo_${item.id}`} />;
        })}
      </div>
      <h2 className="font-bold text-3xl px-4">Create new Repo</h2>
      <div>
        <RepoForm id="" name="" />
      </div>
    </>
  );
};

export default withLayout(Repo);
