import React, { useEffect, useState } from 'react';
import { withLayout } from '../layout/Layout';
import API from '../api/Repo';

interface IRepo {
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
      <h1>Repo List</h1>
      <div>
        {repos.map((item) => {
          return <div key={`repo_${item.id}`}>{item.name}</div>;
        })}
      </div>
    </>
  );
};

export default withLayout(Repo);
