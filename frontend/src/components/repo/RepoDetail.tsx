import React from 'react';
import { IRepo } from './Repo';

const RepoDetail = ({ name }: IRepo): JSX.Element => {
  return (
    <div className="bg-white shadow-lg p-10 rounded-lg mb-5">
      <h3 className="text-2xl font-bold">{name}</h3>
    </div>
  );
};

export default RepoDetail;
