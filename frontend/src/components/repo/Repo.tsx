import React, { useEffect, useState } from 'react';
import { withLayout } from '../../layout/Layout';
import API from '../../api/Repo';
import RepoList from './RepoList';

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

  const handleUpdateRepos = (repos: IRepo[]): void => {
    setRepos(repos);
  };
  return (
    <>
      <RepoList repos={repos} handleUpdateRepos={handleUpdateRepos} />
    </>
  );
};

export default withLayout(Repo);
