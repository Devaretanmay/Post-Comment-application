import React, { useState } from 'react';
import { createPost } from './services/postService';

export default ({ onPostCreated, theme }) => {
    const [title, setTitle] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const newPost = await createPost({ title });
            console.log('Created new post:', newPost);
            setTitle('');
            if (onPostCreated) onPostCreated();
        } catch (error) {
            console.error('Error creating post:', error);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Title</label>
                <input 
                    value={title} 
                    onChange={e => setTitle(e.target.value)} 
                    className={`form-control ${theme}`}
                    placeholder="Enter post title"
                />
            </div>
            <button className={`btn btn-primary w-100 mt-3 ${theme}`}>Create Post</button>
        </form>
    )
}