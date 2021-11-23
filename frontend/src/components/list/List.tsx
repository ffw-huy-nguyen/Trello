import React from 'react';
import Card, { ICard } from './Card';

export interface IList {
  title: string;
  cards: ICard[];
  id: string;
}
const List = ({ cards, id, title }: IList): JSX.Element => {
  return (
    <div>
      <h3>{title}</h3>
      {cards.map((card) => {
        return <Card {...card} key={card.id} />;
      })}
    </div>
  );
};

export default List;
