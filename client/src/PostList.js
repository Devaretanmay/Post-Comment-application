import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';
import { ThemeContext } from './App';

const PostList = () => {
    const [posts, setPosts] = useState({});
    const { isDarkTheme } = useContext(ThemeContext);

    const fetchPosts = async () => {
        const res = await axios.get('http://localhost:4000/posts');
        setPosts(res.data);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const renderedPosts = Object.values(posts).map(post => {
        return (
            <div className={`card ${isDarkTheme ? 'bg-dark text-white' : ''}`} key={post.id}>
                <div className="card-body">
                    <h3 className="post-title">{post.title}</h3>
                    <CommentList postId={post.id} />
                    <CommentCreate postId={post.id} />
                </div>
            </div>
        );
    });

    return (
        <div>
            <h2 className="text-center">Posts</h2>
            {renderedPosts}
        </div>
    );
};

export default PostList;