import React, { useState, useContext } from 'react';
import axios from 'axios';
import { ThemeContext } from './App';

const CommentCreate = ({ postId }) => {
    const [content, setContent] = useState('');
    const { isDarkTheme } = useContext(ThemeContext);

    const onSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
                content
            });
            setContent('');
        } catch (error) {
            console.error('Error creating comment:', error);
        }
    };

    return (
        <div className={`mt-4 ${isDarkTheme ? 'text-white' : ''}`}>
            <h5>Add a Comment</h5>
            <form onSubmit={onSubmit}>
                <div className="form-group mb-3">
                    <label htmlFor="content" className="form-label mb-2">Comment</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        className={`form-control ${isDarkTheme ? 'bg-secondary text-white' : ''}`}
                        placeholder="Write your comment here..."
                        rows="3"
                        required
                    />
                    <small className="form-text text-muted mt-1">
                        Share your thoughts on this post.
                    </small>
                </div>
                <button className="btn btn-primary">Submit Comment</button>
            </form>
        </div>
    );
};

export default CommentCreate;