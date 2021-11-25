import React, { useEffect, useState } from 'react';
import Card, { ICard } from './Card';
import ItemForm from '../field/InputField';
import API from '../../api/Card';
import { Droppable } from 'react-beautiful-dnd';
export interface IList {
  title: string;
  cards: ICard[];
  id: string;
  index: number;
}
const List = ({ cards, id, title, index }: IList): JSX.Element => {
  const [listCards, setListCards] = useState<ICard[]>([]);
  const handleCreatedNewCard = async (name: string): Promise<void> => {
    const newCard = await API.createCard({ listId: id, text: name });
    setListCards([...listCards, newCard]);
  };

  useEffect(() => {
    setListCards(cards);
  }, [cards]);

  const handleDeletedCard = (id: string) => {
    setListCards(listCards.filter((card) => card.id !== id));
  };

  const isDragDisabled = !!(['False Positive', 'Fixed'].indexOf(title) > -1);

  return (
    <>
      <div className="bg-grey p-5 rounded" data-testid={title}>
        <h3 data-testid="list-name" className="font-bold text-xl mb-5">
          {title}
        </h3>
        <Droppable key={index} droppableId={id}>
          {(provided) => (
            <div data-testid="list-card" ref={provided.innerRef} {...provided.droppableProps}>
              {listCards.map((item, index) => (
                <Card
                  onDeleted={handleDeletedCard}
                  isDragDisabled={isDragDisabled}
                  {...item}
                  index={index}
                  key={item.id}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <div data-testid="creating-form">
          <ItemForm onCreated={handleCreatedNewCard} id="" name="" inputName="Card" api={API} />
        </div>
      </div>
    </>
  );
};

export default List;
