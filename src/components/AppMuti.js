import React from 'react';

import Counter from './Counter';

const App = ({ title, styles, img }) => {
  return (
    <div className={styles.app}>
        <h1 className="title">{title}</h1>
        <div><img src={img} /></div>
        <Counter />
    </div>
  );
}

export default App;