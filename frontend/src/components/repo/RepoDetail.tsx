import React from 'react';
import { IRepo } from './Repo';
import { FaTrash, FaEdit } from 'react-icons/fa';
import API from '../../api/Repo';

interface IRepoDetail extends IRepo {
  onDeleted(id: string): void;
}
const RepoDetail = ({ id, name, onDeleted }: IRepoDetail): JSX.Element => {
  const handleDeleteRepo = async (): Promise<void> => {
    if (confirm(`Are you sure you want to delete ${name} repo?`)) {
      await API.deleteItem(id);
      onDeleted(id);
    }
  };
  return (
    <div className="bg-white shadow-lg p-10 rounded-lg mb-5 flex justify-between">
      <h3 className="text-2xl font-bold">{name}</h3>
      <div className="text-orange">
        <button className="mr-2" aria-label={`Update ${name} repo.`}>
          <FaEdit />
        </button>
        <button aria-label={`Delete ${name} repo.`} onClick={handleDeleteRepo}>
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default RepoDetail;
