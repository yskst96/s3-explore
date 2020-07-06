import React from 'react';
import './App.css';

import { s3list, s3get } from "./aws"

function App() {

  const key = "foo.csv"

  return (
    <div className= "App" >
    <button onClick={ s3list }> list </button>
      <button onClick={()=> { s3get(key)} }> get </button>
    </div>
  );
}

export default App;

