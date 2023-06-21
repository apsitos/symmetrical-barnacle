export default function ItemDisplay({
  list,
  checked,
  handleCheckbox,
  handleDelete,
  handleSave,
}) {
  function handleEdit() {
    // This will display an text field prepopulated with the current item's text, will change the buttons to a single SAVE
    console.log('TO DO');
  }

  const showButtons = (item) => {
    return (
      <div className='ml-2 flex justify-between w-4/12'>
        <button
          className='bg-charcoal text-white rounded-md p-1'
          onClick={() => handleEdit(item)}
        >
          Edit
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

  return list.map((item) => {
    return (
      <div className='flex items-center h-10' key={item.id}>
        <input type='checkbox' id={item.id} onClick={handleCheckbox} />
        <p className='ml-3'>{item.text}</p>
        {checked.includes(item.id) && showButtons(item)}
      </div>
    );
  });
}
