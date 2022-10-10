import React from 'react';

import { NavLink } from 'react-router-dom';

const NavBar = () => {

    return (
        <nav className='navigation-container'>
            <ul>
                <NavLink to={'/home'}>
                    <li>
                        Accueil
                    </li>
                </NavLink>
                <NavLink to={'/about'}>
                    <li>
                        Qui sommes nous ?
                    </li>
                </NavLink>
                <NavLink to={'/products'}>
                    <li>
                        Nos produits
                    </li>
                </NavLink>
                <NavLink to={'/contact'}>
                <li>
                    Contact
                </li>
                </NavLink>
                <NavLink to={'/basket'}>
                <li>
                    Panier
                </li>
                </NavLink>
            </ul>
        </nav>
    );
};

export default NavBar;