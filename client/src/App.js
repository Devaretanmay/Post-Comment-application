import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import PostCreate from './PostCreate';
import PostList from './PostList';

export const ThemeContext = createContext();

const App = () => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    useEffect(() => {
        fetchTheme();
    }, []);

    const fetchTheme = async () => {
        try {
            const res = await axios.get('http://localhost:4002/theme');
            setIsDarkTheme(res.data.theme === 'dark');
        } catch (error) {
            console.error('Error fetching theme:', error);
        }
    };

    const toggleTheme = async () => {
        try {
            const newTheme = isDarkTheme ? 'light' : 'dark';
            await axios.post('http://localhost:4002/theme', { theme: newTheme });
            setIsDarkTheme(!isDarkTheme);
        } catch (error) {
            console.error('Error toggling theme:', error);
        }
    };

    return (
        <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
            <div className={`app-container ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
                    <div className="container">
                        <a className="navbar-brand" href="/">Micro Blog</a>
                        <button onClick={toggleTheme} className="btn btn-outline-light">
                            {isDarkTheme ? 'Light Mode' : 'Dark Mode'}
                        </button>
                    </div>
                </nav>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 mb-4">
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <h2 className="card-title">Create Post</h2>
                                    <PostCreate />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <h2 className="card-title mb-4">Recent Posts</h2>
                                    <PostList />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <footer className="mt-5 py-3 bg-light text-center">
                    <div className="container">
                        <span className="text-muted">© 2023 Micro Blog. All rights reserved.</span>
                    </div>
                </footer>
            </div>
        </ThemeContext.Provider>
    );
};

export default App;