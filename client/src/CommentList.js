import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ThemeContext } from './App';

const CommentList = ({ postId }) => {
    const [comments, setComments] = useState([]);
    const { isDarkTheme } = useContext(ThemeContext);

    const fetchData = async () => {
        const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`);
        setComments(res.data);
    };

    useEffect(() => {
        fetchData();
    }, [postId]);

    const renderedComments = comments.map(comment => {
        return <li key={comment.id} className={`comment-item ${isDarkTheme ? 'bg-secondary' : ''}`}>{comment.content}</li>;
    });

    return (
        <div className={`comment-section mt-3 ${isDarkTheme ? 'text-white' : ''}`}>
            <h4>Comments</h4>
            {comments.length > 0 ? (
                <ul className="comment-list">
                    {renderedComments}
                </ul>
            ) : (
                <p className="text-muted">No comments yet.</p>
            )}
        </div>
    );
};

export default CommentList;