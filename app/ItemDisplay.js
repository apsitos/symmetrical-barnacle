export default function ItemDisplay({
  list,
  checked,
  handleCheckbox,
  handleDelete,
  handleEdit,
}) {
  const showButtons = () => {
    return (
      <div className='ml-2 flex justify-between w-4/12'>
        <button className='bg-charcoal text-white rounded-md p-1'>Edit</button>
        <button className='bg-charcoal text-white rounded-md p-1'>
          Delete
        </button>
      </div>
    );
  };
  console.log('CHECKED', checked);
  return list.map((item) => {
    console.log('TF', checked.includes(item.id));
    return (
      <div className='flex items-center h-10' key={item.id}>
        <input type='checkbox' id={item.id} onClick={handleCheckbox} />
        <p className='ml-3'>{item.text}</p>
        {checked.includes(item.id) && showButtons()}
      </div>
    );
  });
}
