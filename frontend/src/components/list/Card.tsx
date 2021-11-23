import React from 'react';
export interface ICard {
  text: string;
  id: string;
}
const Card = ({ text, id }: ICard): JSX.Element => {
  return <div className="bg-white rounded px-4 mb-5">{text}</div>;
};

export default Card;
