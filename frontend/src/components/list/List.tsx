import React, { useState } from 'react';
import Card, { ICard } from './Card';
import ItemForm from '../field/InputField';
import API from '../../api/Card';
import { Draggable, DraggingStyle, Droppable, NotDraggingStyle } from 'react-beautiful-dnd';
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

  const handleDeletedCard = (id: string) => {
    setListCards(listCards.filter((card) => card.id !== id));
  };

  return (
    <div className="bg-grey p-5 rounded">
      <h3 className="font-bold text-xl mb-5">{title}</h3>
      <Droppable key={title} droppableId={id}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {listCards.map((card, index) => {
              return <Card onDeleted={handleDeletedCard} {...card} index={index} key={card.id} />;
            })}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <ItemForm onCreated={handleCreatedNewCard} id="" name="" inputName="Card" api={API} />
    </div>
  );
};

export default List;
