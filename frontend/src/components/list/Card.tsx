import React from 'react';
export interface ICard {
  text: string;
  id: string;
}
const Card = ({ text, id }: ICard): JSX.Element => {
  return <div>{text}</div>;
};

export default Card;
