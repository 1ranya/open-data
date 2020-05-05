import React from 'react';
import './App.css';
import Upload from './component/Upload';
require('dotenv').config()
function App() {
  return (
    <div className="App">
      <Upload/>
    </div>
  );
}

export default App;
