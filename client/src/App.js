import React, { useState, useEffect } from 'react';
import PostCreate from './PostCreate';
import PostList from './PostList';
import Navbar from './Navbar';
import * as themeService from './services/themeService';

export default () => {
    const [theme, setThemeState] = useState('light');

    useEffect(() => {
        const fetchTheme = async () => {
            const currentTheme = await themeService.getTheme();
            setThemeState(currentTheme);
        };
        fetchTheme();
    }, []);

    const changeTheme = async (newTheme) => {
        await themeService.setTheme(newTheme);
        setThemeState(newTheme);
    };

    return (
        <div className={`app ${theme}`}>
            <Navbar theme={theme} changeTheme={changeTheme} themes={themeService.themes} />
            <div className="container mt-4">
                <div className="create-post-section mb-4">
                    <h2>Create Post</h2>
                    <PostCreate theme={theme} />
                    <hr className="mt-4" />
                </div>
                <div className="posts-section">
                    <h2>Posts</h2>
                    <PostList theme={theme} />
                </div>
            </div>
        </div>
    );
};
