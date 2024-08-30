import React from 'react';
import PostCreate from './PostCreate';
import PostList from './PostList';
import Navbar from './Navbar';

export default () => {
    return (
        <div>
            <Navbar />
            <div className="container mt-4">
                <div className="create-post-section mb-4">
                    <h2>Create Post</h2>
                    <PostCreate />
                    <hr className="mt-4" />
                </div>
                <div className="posts-section">
                    <h2>Posts</h2>
                    <PostList />
                </div>
            </div>
        </div>
    );
};
