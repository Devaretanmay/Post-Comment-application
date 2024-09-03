import React, { useState, useEffect } from 'react';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';
import { getPosts, deletePost } from './services/postService';

export default ({ theme }) => {
    const [posts, setPosts] = useState({});
    const [deleteStatus, setDeleteStatus] = useState('');

    const fetchPosts = async () => {
        const fetchedPosts = await getPosts();
        console.log('Fetched posts:', fetchedPosts);
        setPosts(fetchedPosts);
    };

    useEffect(() => {
        fetchPosts();
        const interval = setInterval(fetchPosts, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleDelete = async (postId) => {
        console.log('Attempting to delete post with ID:', postId);
        try {
            await deletePost(postId);
            setDeleteStatus('Post deleted successfully');
            fetchPosts(); // Refresh the list after deletion
            setTimeout(() => setDeleteStatus(''), 3000); // Clear status after 3 seconds
        } catch (error) {
            console.error('Failed to delete post:', error);
            setDeleteStatus('Failed to delete post');
            setTimeout(() => setDeleteStatus(''), 3000);
        }
    };

    const renderedPosts = Object.values(posts).map(post => {
        console.log('Rendering post:', post);
        return (
            <div className={`post-card ${theme}`} key={post.id}>
                <div className="post-header">
                    <h3 className="post-title">{post.title}</h3>
                    <button 
                        className={`btn btn-danger btn-sm ${theme}`} 
                        onClick={() => handleDelete(post.id)}
                    >
                        Delete
                    </button>
                </div>
                <div className="comment-count">{post.comments?.length || 0} comments</div>
                <CommentList postId={post.id} theme={theme} />
                <CommentCreate postId={post.id} onCommentCreated={fetchPosts} theme={theme} />
            </div>
        );
    });

    return (
        <div>
            {deleteStatus && <div className={`alert alert-info ${theme}`}>{deleteStatus}</div>}
            <div className="posts-grid">{renderedPosts}</div>
        </div>
    );
};

