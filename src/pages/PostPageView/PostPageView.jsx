import React, { useEffect, useState } from 'react';
import './postPageView.css';
import { useParams } from 'react-router-dom';
import { api } from '../../api/api';
import GoBackBtn from '../../components/GoBackBtn/GoBackBtn';

const PostPageView = () => {
    const [postInfo, setPostInfo] = useState({});
    const { id } = useParams();

    useEffect(() => {
        api.getOnePost(id).then((data) => setPostInfo(data));
    }, [id]);

    console.log({ postInfo });
    return (
        <>
            <div>
                <GoBackBtn />
            </div>
        </>
    );
};

export default PostPageView;
