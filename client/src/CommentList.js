import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default ({ postId }) => {
    const [comments, setComments] = useState([]);

    const fetchComments = async () => {
        const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`);
        setComments(res.data);
    };

    useEffect(() => {
        fetchComments();
        const interval = setInterval(fetchComments, 5000);
        return () => clearInterval(interval);
    }, [postId]);

    const renderedComments = comments.map(comment => {
        return <li key={comment.id} className="list-group-item">{comment.content}</li>;
    });

    return (
        <div className="mt-3">
            <h4>Comments</h4>
            <ul className="list-group">
                {renderedComments}
            </ul>
        </div>
    );
};