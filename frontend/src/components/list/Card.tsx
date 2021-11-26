import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { FaEdit, FaTrash } from 'react-icons/fa';
import InputField from '../field/InputField';
import moment from 'moment';
import { IBaseApi } from '../../api/Base';

export interface ICard {
  text: string;
  id: string;
  date?: string;
}

interface ICardDetail extends ICard {
  onDeleted(id: string): void;
  index: number;
  isDragDisabled?: boolean;
  api: IBaseApi;
}
const Card = ({
  text,
  id,
  date,
  onDeleted,
  api,
  index,
  isDragDisabled
}: ICardDetail): JSX.Element => {
  const [editing, setEditing] = useState(false);
  const [cardName, setCardName] = useState(text);
  const [cardDate, setCardDate] = useState(date);

  const handleDeleteCard = async (): Promise<void> => {
    if (confirm(`Are you sure you want to delete ${text} card?`)) {
      await api.deleteItem(id);
      onDeleted(id);
    }
  };

  const handleUpdatedCard = async (name: string): Promise<void> => {
    const updatedCard = await api.updateItem<{ date: string }, { text: string; id: string }>(id, {
      text: name,
      id
    });
    setCardName(name);
    setCardDate(updatedCard.date);
    setEditing(false);
  };
  return (
    <Draggable key={id} draggableId={id} index={index} isDragDisabled={isDragDisabled}>
      {(provided) => (
        <div
          data-testid="card-detail"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}>
          <div className="card-detail bg-white shadow-lg p-10 rounded-lg mb-5 relative">
            <h3 data-testid="card-name" className="font-bold">
              {cardName}
            </h3>
            {cardDate && (
              <p className="text-xs mt-4">
                Updated at: {moment(cardDate).format('Do MMM YYYY - H:m')}
              </p>
            )}

            <div className="text-orange absolute top-1 right-2">
              <button
                className="mr-2"
                aria-label={`Update ${cardName} card.`}
                onClick={() => setEditing(true)}
                data-testid="update-btn">
                <FaEdit />
              </button>
              <button
                aria-label={`Delete ${cardName} card.`}
                data-testid="delete-btn"
                onClick={handleDeleteCard}>
                <FaTrash />
              </button>
            </div>
            {editing && (
              <>
                <div data-testid="editing-form">
                  <InputField
                    id={id}
                    name={cardName}
                    editing={true}
                    onUpdated={handleUpdatedCard}
                    onCanceled={() => setEditing(false)}
                    inputName="card"
                    api={api}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
