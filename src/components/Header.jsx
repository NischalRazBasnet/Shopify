import React from 'react';
import { NavLink } from 'react-router';

export default function Header() {
  return (
    <div className='px-10 py-5 flex justify-between bg-black text-white'>
      <h1>Shopify</h1>
      <nav>
        <NavLink to={''}></NavLink>
      </nav>
    </div>
  );
}
