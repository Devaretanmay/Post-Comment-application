import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

export default () => {
    const [posts, setPosts] = useState({});

    const fetchPosts = async () => {
        const res = await axios.get('http://localhost:4000/posts');
        setPosts(res.data);
    };

    useEffect(() => {
        fetchPosts();
        const interval = setInterval(fetchPosts, 5000);
        return () => clearInterval(interval);
    }, []);

    const renderedPosts = Object.values(posts).map(post => {
        return (
            <div className="post-card" key={post.id}>
                <h3 className="post-title">{post.title}</h3>
                <div className="comment-count">{post.comments?.length || 0} comments</div>
                <CommentList postId={post.id} />
                <CommentCreate postId={post.id} onCommentCreated={fetchPosts} />
            </div>
        );
    });

    return (
        <div className="posts-grid">{renderedPosts}</div>
    );
};

