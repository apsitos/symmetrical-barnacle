import { useState } from 'react';

export default function ItemDisplay({
  checked,
  item,
  handleCheckbox,
  handleDelete,
  handleSave,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState('');

  function handleButton() {
    if (isEditing) {
      const updated = { ...item, text: editText };
      handleSave(updated);
      return setIsEditing(!isEditing);
    }
    setIsEditing(!isEditing);
    setEditText(item.text);
  }

  const showButtons = (item) => {
    return (
      <div className='ml-2 flex justify-between w-4/12'>
        <button
          className='bg-charcoal text-white rounded-md p-1'
          onClick={() => handleButton()}
        >
          {isEditing ? 'Save' : 'Edit'}
        </button>
        <button
          className='bg-charcoal text-white rounded-md p-1'
          onClick={() => handleDelete(item)}
        >
          Delete
        </button>
      </div>
    );
  };

  return (
    <div className='flex items-center h-10'>
      <input type='checkbox' id={item.id} onClick={handleCheckbox} />
      {isEditing ? (
        <input
          type='text'
          className='ml-3'
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
        />
      ) : (
        <p className='ml-3'>{item.text}</p>
      )}
      {checked.includes(item.id) && showButtons(item)}
    </div>
  );
}
