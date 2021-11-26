import React, { useState } from 'react';
import { IRepo } from './Repo';
import { FaTrash, FaEdit } from 'react-icons/fa';
import ItemForm from '../field/InputField';
import { Link } from 'react-router-dom';
import { IBaseApi } from '../../api/Base';

interface IRepoDetail extends IRepo {
  onDeleted(id: string): void;
  api: IBaseApi;
}
const RepoDetail = ({ id, name, onDeleted, api }: IRepoDetail): JSX.Element => {
  const [editing, setEditing] = useState(false);
  const [repoName, setRepoName] = useState(name);

  const handleDeleteRepo = async (): Promise<void> => {
    if (confirm(`Are you sure you want to delete ${name} repo?`)) {
      await api.deleteItem(id);
      onDeleted(id);
    }
  };

  const handleUpdatedRepo = async (name: string): Promise<void> => {
    await api.updateItem(id, { id, name });
    setRepoName(name);
    setEditing(false);
  };
  return (
    <div className="repo-detail bg-white shadow-lg p-10 rounded-lg mb-5 flex justify-between">
      <div>
        <h3 data-testid="repo-name" className="text-2xl font-bold">
          <Link to={`/${id}`}>{repoName}</Link>
        </h3>
        {editing && (
          <>
            <div data-testid="editing-form">
              <ItemForm
                id={id}
                name={repoName}
                editing={true}
                onUpdated={handleUpdatedRepo}
                onCanceled={() => setEditing(false)}
                inputName="Repo"
                api={api}
              />
            </div>
          </>
        )}
      </div>

      <div className="text-orange">
        <button
          className="mr-2"
          aria-label={`Update ${repoName} repo.`}
          onClick={() => setEditing(true)}
          data-testid="update-btn">
          <FaEdit />
        </button>
        <button
          aria-label={`Delete ${repoName} repo.`}
          data-testid="delete-btn"
          onClick={handleDeleteRepo}>
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default RepoDetail;
