import React, { useEffect, useState } from 'react';

import { NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const NavBar = ({checkPage}) => {

    const [displayMenu, setDisplayMenu] = useState(false);

    const carpetsContainer = document.querySelector('.carpets-container');
    const lampsContainer = document.querySelector('.lamps-container');
    const decorationsContainer = document.querySelector('.decorations-container');
    const selectProductsContainer = document.getElementById('products-list-container');

    function displayList() {
        setDisplayMenu(!displayMenu);
        const selectQuickList = document.querySelector('.quick-list-container');
        selectQuickList.classList.add('menu-active');
    }

    function displayProducts(products) {
        
        if (products === 'carpets') {
            carpetsContainer.click();
            selectProductsContainer.scrollIntoView(({behavior: "smooth"}));
        }
            
        if (products === 'lamps') {
            lampsContainer.click();
            selectProductsContainer.scrollIntoView(({behavior: "smooth"}));
        }
            
        if (products === 'decorations') {
            decorationsContainer.click();
            selectProductsContainer.scrollIntoView(({behavior: "smooth"}));
        }
            
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
                                <div onClick={() => displayProducts('carpets')}>
                                    <span>ⵜ</span>
                                    Tapis
                                </div>
                            </li>
                            <li>
                                <div onClick={() => displayProducts('lamps')}>
                                    <span>ⵍ</span>
                                    Luminaires
                                </div>
                            </li>
                            <li>
                                <div onClick={() => displayProducts('decorations')}>
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