import React, { useEffect, useState } from 'react';
import { withLayout } from '../../layout/Layout';
import API from '../../api/Repo';
import RepoDetail from './RepoDetail';
import ItemForm from '../field/InputField';

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

  const handleCreatedNewRepo = (repo: IRepo): void => {
    setRepos([...repos, repo]);
  };

  const handleDeletedRepo = (id: string): void => {
    setRepos(repos.filter((repo) => repo.id !== id));
  };
  return (
    <>
      <h1 className="font-bold text-3xl px-4">Repo List</h1>
      <div>
        {repos.map((item) => {
          return <RepoDetail onDeleted={handleDeletedRepo} {...item} key={`repo_${item.id}`} />;
        })}
      </div>
      <h2 className="font-bold text-3xl px-4">Create new Repo</h2>
      <div>
        <ItemForm onCreated={handleCreatedNewRepo} id="" name="" inputName="Repo" api={API} />
      </div>
    </>
  );
};

export default withLayout(Repo);
