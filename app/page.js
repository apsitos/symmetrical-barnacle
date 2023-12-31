'use client';
import { useEffect, useState } from 'react';

import ItemDisplay from './ItemDisplay';

export default function Home() {
  const [list, setList] = useState(null);
  const [text, setText] = useState('');
  const [checked, setChecked] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/todolist', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }).then((res) => res.json());
      console.log(response);
      setList(response.results);
    }
    fetchData();
  }, []);

  function handleTextInput(e) {
    setText(e.target.value);
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

  async function handleAdd() {
    const record = {
      id: (list.length += 1),
      text: text,
      createdAt: Date.now(),
      lastEdited: '',
      markedComplete: false,
    };

    const result = await fetch('/api/todolist/new', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record),
    }).then((res) => res.json());
    // if (result.error) show dialog that error occurred
    setList(result.results);
  }

  async function handleSave(record) {
    console.log('This will be saved', record);
    const result = await fetch(`/api/todolist/${record.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record),
    }).then((res) => res.json());
    const resetChecked = [...checked].filter((old) => old.id !== record.id);
    setChecked(resetChecked);
  }

  async function handleDelete(item) {
    const result = await fetch(`/api/todolist/${item.id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => res.json());
    // if (result.error) show dialog that error occurred
    setList(result);
  }

  return (
    <main className='flex min-h-screen flex-col items-center p-24'>
      <h1 className='text-center text-3xl font-bold'>To Do List</h1>
      <div className='flex my-8 items-center justify-around mb-4 w-5/6'>
        <p>Add to your list:</p>
        <input
          type='text'
          className='h-10 w-96 px-3 mx-4 rounded'
          onChange={handleTextInput}
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
        </div>
      </div>

      <div className='items-left w-4/12'>
        {list?.map((item) => (
          <ItemDisplay
            checked={checked}
            item={item}
            key={item.id}
            handleCheckbox={handleCheckbox}
            handleDelete={handleDelete}
            handleSave={handleSave}
          />
        ))}
      </div>
    </main>
  );
}
