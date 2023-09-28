import React from 'react';
import '../styles/header.css'

const Header = ({ title }) => {
    return (
        <div className="header-container">
            <h1 className="header-title">{title}</h1>
            <hr className="header-divider" />
        </div>
    );
};

export default Header;
