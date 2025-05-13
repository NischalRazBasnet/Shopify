import React, { memo } from 'react';

export default memo(function Child({ func }) {
  console.log('child render');
  return (
    <div>
      <button>{func()}</button>

      <h1>Child Render</h1>
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
    </div>
  );
});
