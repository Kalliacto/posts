import { useDispatch } from 'react-redux';
import './sortPosts.css';
import React, { memo, useMemo } from 'react';
import { sortingPosts } from '../../store/slices/postsSlice';

const SortPosts = memo(() => {
    const dispatch = useDispatch();

    const sortItem = useMemo(() => [
        { id: 'alphabet', title: 'По алфавиту' },
        { id: 'popular', title: 'Популярные' },
        { id: 'new', title: 'Новые' },
        { id: 'old', title: 'Древние' },
        { id: 'comments', title: 'Наиболее обсуждаемые' },
    ]);

    return (
        <div className='sort__posts_wrapper'>
            <div className='sort__posts'>
                {sortItem.map((item) => {
                    return (
                        <span
                            key={item.id}
                            onClick={() => dispatch(sortingPosts(item.id))}
                            className='sort__posts_text'
                        >
                            {item.title}
                        </span>
                    );
                })}
            </div>
        </div>
    );
});

export default SortPosts;
