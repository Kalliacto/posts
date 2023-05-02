import React from 'react';
import './App.css';
import { Context } from './context/Context';

function App() {
    const valueContext = {};
    return (
        <div className="App">
            <Context.Provider value={valueContext}></Context.Provider>
        </div>
    );
}

export default App;
