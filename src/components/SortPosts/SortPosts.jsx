import { Context } from '../../context/Context';
import { onSortPosts } from '../../utils/utils';
import './sortPosts.css';

import React, { useContext } from 'react';

const SortPosts = () => {
    const { posts, setPosts } = useContext(Context);
    const sortItem = [
        { id: 'all', title: 'Все посты' },
        { id: 'popular', title: 'Популярные' },
        { id: 'new', title: 'Новые' },
        { id: 'old', title: 'Древние' },
    ];
    return (
        <div className="sort__posts_wrapper">
            <div className="sort__posts">
                {sortItem.map((item) => {
                    return (
                        <span
                            key={item.id}
                            onClick={() => onSortPosts(posts, item.id, setPosts)}
                            className="sort__posts_text"
                        >
                            {item.title}
                        </span>
                    );
                })}
            </div>
        </div>
    );
};

export default SortPosts;
