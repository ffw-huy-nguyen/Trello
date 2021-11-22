import React, { useState } from 'react';
import { IRepo } from './Repo';
import API from '../../api/Repo';

const RepoForm = ({ id, name }: IRepo): JSX.Element => {
  const [repoId] = useState(id);
  const [repoName, setRepoName] = useState(name);
  const handleSaveRepo = async (): Promise<void> => {
    if (repoId) {
      await API.updateItem(repoId, { name: repoName });
    } else {
      await API.createItem({ name: repoName });
    }
  };
  return (
    <div className="shadow-lg p-4">
      <input
        className="shadow appearance-none border rounded w-64 mr-4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        value={repoName}
        placeholder="Please enter repo name."
        onChange={(e) => setRepoName(e.target.value)}
      />
      <button
        className="bg-orange hover:bg-white text-white hover:text-orange font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline border border-orange"
        onClick={handleSaveRepo}>
        Save
      </button>
    </div>
  );
};

export default RepoForm;
