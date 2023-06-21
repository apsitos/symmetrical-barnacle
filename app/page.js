'use client';
import { useEffect, useState } from 'react';

import data from '../data/todos.json';
import ItemDisplay from './ItemDisplay';

export default function Home() {
  const [list, setList] = useState([]);
  const [text, setText] = useState('');
  const [checked, setChecked] = useState([]);

  useEffect(() => {
    const mockData = data.results;
    setList(mockData);
  }, []);

  function handleTextInput(e) {
    setText(e.target.value);
  }

  function handleAdd() {
    console.log('Adding to do item', text);
    // POST text to create endpoint
  }

  function handleCheckbox(e) {
    let newChecked = [...checked];
    if (e.target.checked) {
      newChecked.push(Number(e.target.id));
    } else {
      newChecked = newChecked.filter((item) => item !== Number(e.target.id));
    }
    setChecked(newChecked);
  }

  function handleEdit() {}

  function handleDelete() {}

  return (
    <main className='flex min-h-screen flex-col items-center p-24'>
      <h1 className='text-center text-3xl font-bold'>To Do List</h1>
      <div className='flex my-8 items-center justify-around mb-4 w-5/6'>
        <p>Add to your list:</p>
        <input
          type='text'
          className='h-10 w-96 px-3 mx-4 rounded'
          onChange={(e) => handleTextInput(e)}
          value={text}
        />
        <div className='flex justify-between w-1/6'>
          <button
            className='bg-charcoal text-white rounded-md p-2'
            onClick={handleAdd}
          >
            Add
          </button>
          <button className='bg-charcoal text-white rounded-md p-2'>
            Show All
          </button>
          {/* <button className='bg-charcoal text-white rounded-md p-2'>
            Sort by Most Recent
          </button> */}
        </div>
      </div>

      <div className='items-left w-4/12'>
        <ItemDisplay
          list={list}
          checked={checked}
          handleCheckbox={handleCheckbox}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      </div>
    </main>
  );
}
