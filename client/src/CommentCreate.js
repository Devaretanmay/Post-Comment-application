import React, { useState } from 'react';
import axios from 'axios';

export default ({ postId, onCommentCreated, theme }) => {
    const [content, setContent] = useState('');
    const [error, setError] = useState('');

    const onSubmit = async (event) => {
        event.preventDefault();

        if (!content.trim()) {
            setError('Comment cannot be empty');
            return;
        }

        try {
            await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
                content
            });

            setContent('');
            setError('');
            if (onCommentCreated) onCommentCreated();
        } catch (err) {
            setError('Failed to create comment. Please try again.');
        }
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>New Comment</label>
                    <input
                        value={content}
                        onChange={e => {
                            setContent(e.target.value);
                            setError('');
                        }}
                        className={`form-control ${theme}`}
                        placeholder="Enter your comment"
                    />
                </div>
                {error && <div className="alert alert-danger mt-2">{error}</div>}
                <button className={`btn btn-secondary mt-2 ${theme}`}>Add Comment</button>
            </form>
        </div>
    );
};