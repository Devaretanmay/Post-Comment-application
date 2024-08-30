import React, { useState } from 'react';
import axios from 'axios';

export default ({ onPostCreated }) => {
    const [title, setTitle] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:4000/posts', { title });
            setTitle('');
            if (onPostCreated) onPostCreated();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Title</label>
                <input 
                    value={title} 
                    onChange={e => setTitle(e.target.value)} 
                    className="form-control"
                    placeholder="Enter post title"
                />
            </div>
            <button className="btn btn-primary w-100 mt-3">Create Post</button>
        </form>
    )
}