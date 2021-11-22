import React, { useState } from 'react';
import { IBaseApi } from '../api/Base';
import { IItem } from '../interfaces/global.interface';

const ItemForm = ({
  id,
  name,
  onCreated,
  onUpdated,
  onCanceled,
  editing,
  api,
  inputName
}: {
  id: string;
  name: string;
  onCreated?(newItem: IItem): void;
  onUpdated?(name: string): void;
  onCanceled?(): void;
  editing?: boolean;
  api: IBaseApi;
  inputName: string;
}): JSX.Element => {
  const [itemId] = useState(id);
  const [itemName, setItemName] = useState(name);
  const handleSaveItem = async (): Promise<void> => {
    if (!itemName) {
      alert(`Please enter ${inputName} name.`);
      return;
    }
    if (itemId) {
      await api.updateItem(itemId, { name: itemName, id });
      onUpdated && onUpdated(itemName);
    } else {
      const newItem = await api.createItem<IItem, { name: string }>({ name: itemName });
      onCreated && onCreated(newItem);
      setItemName('');
    }
  };
  return (
    <div className="shadow-lg p-4">
      <input
        className="shadow appearance-none border rounded w-64 mr-4 py-2 px-3 text-gray-700 leading-tight"
        type="text"
        value={itemName}
        placeholder={`Please enter ${inputName} name.`}
        onChange={(e) => setItemName(e.target.value)}
        aria-label={`Enter ${inputName} name.`}
      />
      <button className="btn" aria-label={`Submit ${inputName} name.`} onClick={handleSaveItem}>
        Save
      </button>
      {editing && (
        <button
          className="btn btn--cancel"
          aria-label={`Submit ${inputName}.`}
          onClick={onCanceled}>
          Cancel
        </button>
      )}
    </div>
  );
};

export default ItemForm;
