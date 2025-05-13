import React from 'react';
import { NavLink } from 'react-router';

export default function Header() {
  return (
    <div className='px-10 py-5 flex justify-between bg-black text-white'>
      <h1>Redux</h1>
      <nav>
        <NavLink to={'add-todo'}>Add Todo</NavLink>
      </nav>
    </div>
  );
}
