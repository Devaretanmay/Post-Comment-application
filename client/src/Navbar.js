import React from 'react';

const Navbar = ({ theme, changeTheme, themes }) => {
    return (
        <nav className={`navbar navbar-${theme}`}>
            <div className="container">
                <a className="navbar-brand" href="/" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Blog Post App</a>
                <div className="ml-auto">
                    <select 
                        value={theme}
                        onChange={(e) => changeTheme(e.target.value)}
                        className={`form-select ${theme}`}
                    >
                        {themes && themes.map(t => (
                            <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                        ))}
                    </select>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;