import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { withLayout } from '../../layout/Layout';
import API from '../../api/Repo';
import List, { IList } from './List';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

interface IBoard {
  name: string;
  id: string;
  lists: IList[];
}

const Board = (): JSX.Element => {
  const { id } = useParams();
  const [lists, setLists] = useState<IList[]>([]);
  const [repoName, setRepoName] = useState('');
  useEffect(() => {
    const getRepoDetail = async () => {
      if (id) {
        const res = await API.getItem<IBoard>(id);
        setLists(res.lists);
        setRepoName(res.name);
      }
    };
    getRepoDetail();
  }, []);

  const handleOnDragEnd = (result: DropResult) => {
    console.log(result);
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    handleMoveCard(destination, source, draggableId);
  };

  const handleMoveCard = async (
    destination?: {
      droppableId: string;
      index: number;
    },
    source?: { droppableId: string; index: number },
    draggableId?: string
  ): Promise<void> => {
    const newBoard = await API.moveCard(draggableId, destination, source, id);
    setLists(newBoard.lists);
  };
  return (
    <div>
      <h1 className="h1 mb-5">Board: {repoName}</h1>
      <div className="grid grid-cols-4 gap-6">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          {lists.map((el, ind) => (
            <List {...el} index={ind} key={el.id} />
          ))}
        </DragDropContext>
      </div>
    </div>
  );
};

export default withLayout(Board);
