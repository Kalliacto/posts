import { useDispatch } from 'react-redux';
import './sortPosts.css';
import React, { memo } from 'react';
import { sortingPosts } from '../../store/slices/postsSlice';
import { sortItem } from '../../utils/utils';

const SortPosts = memo(() => {
    const dispatch = useDispatch();
    
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
