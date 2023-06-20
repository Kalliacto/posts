import React from 'react';
import './search.css';
import { XCircle as SearchIcon } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import { setSearch } from '../../store/slices/postsSlice';
import { useLocation } from 'react-router-dom';

const Search = () => {
    const { search } = useSelector((s) => s.posts);
    const dispatch = useDispatch();
    const location = useLocation();

    const setSearchQuery = (path) => {
        dispatch(setSearch(path));
    };

    return (
        <div className='search'>
            <input
                disabled={location.pathname.includes('/post/')}
                className='search__input'
                placeholder='Поиск постов на любой вкус...'
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            {!!search && (
                <SearchIcon
                    className='search__icon'
                    onClick={(e) => {
                        e.currentTarget.previousElementSibling.value = '';
                        setSearchQuery('');
                    }}
                />
            )}
        </div>
    );
};

export default Search;
