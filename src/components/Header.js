import React from 'react';
import NavBar from './NavBar';
import ZalaiLogo from './ZalaiLogo';

const Header = ({checkPage, isLoading}) => {
    return (
        <header className='header-except-home'>
            <h1>
                <ZalaiLogo isLoading={isLoading}/>
            </h1>
            <h2>Art berbère</h2>
            <NavBar checkPage={checkPage} />
        </header>
    );
};

export default Header;