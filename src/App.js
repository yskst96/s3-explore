import React from 'react';
import './App.css';

import {s3list,s3get} from "./aws"

function App() {


  return (
    <div className="App">
      <div>
        <button onClick={s3list}>list</button>
        <button onClick={s3get}>get</button>
      </div>
    </div>
  );
}

export default App;

