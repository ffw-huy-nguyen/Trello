import React from 'react';
import { IRepo } from './Repo';
import RepoDetail from './RepoDetail';
import ItemForm from '../field/InputField';
import API from '../../api/Repo';
import { IItem } from '../../interfaces/global.interface';

interface IRepoList {
  repos: IRepo[];
  handleUpdateRepos(repos: IRepo[]): void;
}

const RepoList = ({ repos, handleUpdateRepos }: IRepoList): JSX.Element => {
  const handleCreatedNewRepo = async (name: string): Promise<void> => {
    const newItem = await API.createItem<IItem, { name: string }>({ name });
    handleUpdateRepos([newItem, ...repos]);
  };

  const handleDeletedRepo = (id: string): void => {
    handleUpdateRepos(repos.filter((repo) => repo.id !== id));
  };
  return (
    <>
      <h2 className="h2">Repo List</h2>
      <div data-testid="repo-list">
        {repos.length > 0 ? (
          <>
            {repos.map((item) => {
              return (
                <RepoDetail
                  onDeleted={handleDeletedRepo}
                  api={API}
                  {...item}
                  key={`repo_${item.id}`}
                />
              );
            })}
          </>
        ) : (
          <>
            <h3>There is no repo.</h3>
          </>
        )}
      </div>
      <h2 className="h2">Create new Repo</h2>
      <div>
        <ItemForm onCreated={handleCreatedNewRepo} id="" name="" inputName="Repo" api={API} />
      </div>
    </>
  );
};

export default RepoList;
