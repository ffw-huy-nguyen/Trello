import React, { useState } from 'react';
import { IRepo } from './Repo';
import { FaTrash, FaEdit } from 'react-icons/fa';
import API from '../../api/Repo';
import RepoForm from './RepoForm';
import classnames from 'classnames';
interface IRepoDetail extends IRepo {
  onDeleted(id: string): void;
}
const RepoDetail = ({ id, name, onDeleted }: IRepoDetail): JSX.Element => {
  const [editing, setEditing] = useState(false);
  const [repoName, setRepoName] = useState(name);

  const handleDeleteRepo = async (): Promise<void> => {
    if (confirm(`Are you sure you want to delete ${name} repo?`)) {
      await API.deleteItem(id);
      onDeleted(id);
    }
  };

  const handleUpdatedRepo = (name: string): void => {
    setRepoName(name);
    setEditing(false);
  };
  return (
    <div className="bg-white shadow-lg p-10 rounded-lg mb-5 flex justify-between">
      <div>
        <h3 className="text-2xl font-bold">{repoName}</h3>
        <div className={classnames(!editing && 'hidden')}>
          <RepoForm
            id={id}
            name={repoName}
            editing={true}
            onUpdated={handleUpdatedRepo}
            onCanceled={() => setEditing(false)}
          />
        </div>
      </div>

      <div className="text-orange">
        <button
          className="mr-2"
          aria-label={`Update ${repoName} repo.`}
          onClick={() => setEditing(true)}>
          <FaEdit />
        </button>
        <button aria-label={`Delete ${repoName} repo.`} onClick={handleDeleteRepo}>
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default RepoDetail;
