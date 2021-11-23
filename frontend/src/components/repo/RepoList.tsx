import React from 'react';
import { IRepo } from './Repo';
import RepoDetail from './RepoDetail';
import ItemForm from '../field/InputField';
import API from '../../api/Repo';

interface IRepoList {
  repos: IRepo[];
  handleUpdateRepos(repos: IRepo[]): void;
}
const RepoList = ({ repos, handleUpdateRepos }: IRepoList): JSX.Element => {
  const handleCreatedNewRepo = (repo: IRepo): void => {
    handleUpdateRepos([...repos, repo]);
  };

  const handleDeletedRepo = (id: string): void => {
    handleUpdateRepos(repos.filter((repo) => repo.id !== id));
  };
  return (
    <>
      <h1 className="font-bold text-3xl px-4">Repo List</h1>
      <div data-testid="repo-list">
        {repos.length > 0 ? (
          <>
            {repos.map((item) => {
              return <RepoDetail onDeleted={handleDeletedRepo} {...item} key={`repo_${item.id}`} />;
            })}
          </>
        ) : (
          <>
            <h3>There is no repo.</h3>
          </>
        )}
      </div>
      <h2 className="font-bold text-3xl px-4">Create new Repo</h2>
      <div>
        <ItemForm onCreated={handleCreatedNewRepo} id="" name="" inputName="Repo" api={API} />
      </div>
    </>
  );
};

export default RepoList;
