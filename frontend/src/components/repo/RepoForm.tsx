import React, { useState } from 'react';
import { IRepo } from './Repo';
import API from '../../api/Repo';

interface IRepoForm extends IRepo {
  onCreated?(newRepo: IRepo): void;
  onUpdated?(name: string): void;
  onCanceled?(): void;
  editing?: boolean;
}
const RepoForm = ({
  id,
  name,
  onCreated,
  onUpdated,
  onCanceled,
  editing
}: IRepoForm): JSX.Element => {
  const [repoId] = useState(id);
  const [repoName, setRepoName] = useState(name);
  const handleSaveRepo = async (): Promise<void> => {
    if (!repoName) {
      alert('Please enter repo name.');
      return;
    }
    if (repoId) {
      await API.updateItem(repoId, { name: repoName, id });
      onUpdated && onUpdated(repoName);
    } else {
      const newRepo = await API.createItem<IRepo, { name: string }>({ name: repoName });
      onCreated && onCreated(newRepo);
      setRepoName('');
    }
  };
  return (
    <div className="shadow-lg p-4">
      <input
        className="shadow appearance-none border rounded w-64 mr-4 py-2 px-3 text-gray-700 leading-tight"
        type="text"
        value={repoName}
        placeholder="Please enter repo name."
        onChange={(e) => setRepoName(e.target.value)}
        aria-label="Enter repo name."
      />
      <button className="btn" aria-label="Submit repo." onClick={handleSaveRepo}>
        Save
      </button>
      {editing && (
        <button className="btn btn--cancel" aria-label="Submit repo." onClick={onCanceled}>
          Cancel
        </button>
      )}
    </div>
  );
};

export default RepoForm;
