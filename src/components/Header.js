import React from 'react';
import NavBar from './NavBar';

const Header = () => {
    return (
        <header className='header-except-home'>
            <h1>Zalaï</h1>
            <h2>Art berbère</h2>
            <NavBar />
        </header>
    );
};

export default Header;