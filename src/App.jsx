import React from 'react';
import './App.css';
import { Context } from './context/Context';
import Header from './components/Header/Header';

function App() {
    const valueContext = {};
    return (
        <div className="App">
            <Context.Provider value={valueContext}>
                <Header />
            </Context.Provider>
        </div>
    );
}

export default App;
