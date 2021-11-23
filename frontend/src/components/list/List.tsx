import React, { useState } from 'react';
import Card, { ICard } from './Card';
import ItemForm from '../field/InputField';
import API from '../../api/Card';
export interface IList {
  title: string;
  cards: ICard[];
  id: string;
}
const List = ({ cards, id, title }: IList): JSX.Element => {
  const [listCards, setListCards] = useState<ICard[]>(cards);
  const handleCreatedNewCard = async (name: string): Promise<void> => {
    const newCard = await API.createCard({ listId: id, text: name });
    setListCards([...listCards, newCard]);
  };
  return (
    <div className="bg-grey p-5 rounded">
      <h3 className="font-bold text-xl mb-5">{title}</h3>
      {listCards.map((card) => {
        return <Card {...card} key={card.id} />;
      })}
      <ItemForm onCreated={handleCreatedNewCard} id="" name="" inputName="Card" api={API} />
    </div>
  );
};

export default List;
