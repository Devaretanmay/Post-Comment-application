import React, { useState, useContext } from 'react';
import axios from 'axios';
import { ThemeContext } from './App';

const PostCreate = () => {
    const [title, setTitle] = useState('');
    const { isDarkTheme } = useContext(ThemeContext);

    const onSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.post('http://localhost:4000/posts', { title });
            setTitle('');
            alert('Post created successfully');
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    return (
        <div className={`card ${isDarkTheme ? 'bg-dark text-white' : ''}`}>
            <div className="card-header">Create a New Post</div>
            <div className="card-body">
                <form onSubmit={onSubmit}>
                    <div className="form-group mb-3">
                        <label htmlFor="title" className="form-label mb-2">Title</label>
                        <input
                            id="title"
                            type="text"
                            className={`form-control ${isDarkTheme ? 'bg-secondary text-white' : ''}`}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter post title"
                            required
                        />
                        <small className="form-text text-muted mt-1">
                            Enter a descriptive title for your post.
                        </small>
                    </div>
                    <button type="submit" className="btn btn-primary mt-3">Create Post</button>
                </form>
            </div>
        </div>
    );
};

export default PostCreate;