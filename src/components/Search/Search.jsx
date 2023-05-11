import React from 'react';
import './search.css';
import { Search as SearchIcon } from 'react-bootstrap-icons';

const Search = ({ setSearch }) => {
    return (
        <div className='search'>
            <input
                className='search__input'
                placeholder='Поиск постов на любой вкус...'
                onChange={(e) => setSearch(e.target.value)}
            />
            <SearchIcon className='search__icon' />
        </div>
    );
};

export default Search;
