import React, { useEffect, useState } from 'react';

import { NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const NavBar = ({checkPage}) => {

    const [displayMenu, setDisplayMenu] = useState(false);

    function displayList() {
        setDisplayMenu(!displayMenu);
        const selectQuickList = document.querySelector('.quick-list-container');
        selectQuickList.classList.add('menu-active');
    }

    useEffect(() => {
        const selectChevron = document.querySelector('.chevron-down');
        const selectChevronColor = document.querySelector('.chevron-down path');
        const selectQuickList = document.querySelector('.quick-list-container');

        if (displayMenu) {

            selectChevron.style.transform = 'rotate(0deg)';
            selectChevronColor.style.color = '#694840';
            selectQuickList.classList.remove('menu-inactive');
            selectQuickList.classList.add('menu-active');
        }
        else {   

            if (selectQuickList === null || selectChevron === null) return;
          
            selectChevron.style.transform = 'rotate(270deg)';
            selectChevronColor.style.color = 'rgba(59, 131, 155, 1)';
            selectQuickList.classList.remove('menu-active');
            selectQuickList.classList.add('menu-inactive');
        }

    }, [displayMenu])

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
                        { (checkPage === 'product') ?
                        <>
                        <FontAwesomeIcon icon={faChevronDown} className="chevron-down" onClick={displayList}/>
                        <ul className="quick-list-container">
                            <li>
                                <div>
                                    <span>ⵜ</span>
                                    Tapis
                                </div>
                            </li>
                            <li>
                                <div>
                                    <span>ⵍ</span>
                                    Luminaires
                                </div>
                            </li>
                            <li>
                                <div>
                                    <span>ⴷ</span>
                                    Décorations
                                </div>
                            </li>
                        </ul>
                        </>
                        : null }
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