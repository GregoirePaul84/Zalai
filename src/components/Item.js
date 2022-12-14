import React, { useCallback, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ProductContext } from '../pages/Products';

import border from '../media/border.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons';
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

const Item = ({cartLength, setCartLength, productClass, productName, productOldPrice, productNewPrice, productTribe, productSize, productImg, productHover, productAlt, addBasket, productId, isAdded, isSold, isNew}) => {
    const navigate = useNavigate();

    const detail = useContext(ProductContext);
    const displayDetail = detail.displayDetail;
    const setDisplayDetail = detail.setDisplayDetail;

    const [imgHover, setImgHover] = useState(false);
    const [cancelBtn, setCancelBtn] = useState('none');

    function displayProduct() {
        setDisplayDetail(!displayDetail);
        navigate(`/Zalai/products/${productId}`);
    }

    // Vérifie si le produit choisi est déjà présent dans le panier

    function checkCardPresence(id) {
        const cart = JSON.parse(localStorage.getItem('basket'));
        console.log(id);
        
        if (cart.some(item => item.id === id)) {
            return true;
        }
        else {
            return false;
        }
    }
 
    // Ajoute le produit au panier ou non après vérification

    const addToBasket = useCallback((id) => {
        let storage = JSON.parse(localStorage.getItem('basket'));

        if (checkCardPresence(id)) {
            if(window.confirm('Etes vous sûr(e) de vouloir supprimer ce produit du panier ?') === true) {
                
                // Suppression du produit selon l'id
                storage = storage.filter((item) => item.id !== id);

                // Suppression du produit du local storage
                localStorage.setItem('basket', JSON.stringify(storage));

                // Suppression de la classe 'selected'
                document.querySelector(`.${productClass} button`).classList.remove('selected');

                // Mise à jour du state du bouton d'annulation sur 'none'
                setCancelBtn('none');

                // Décrémentation du nombre d'articles du panier
                setCartLength(cartLength => cartLength - 1)
            }
            else {
                console.log('annulé');
            }
        }
        else {
            if(window.confirm('Etes vous sûr(e) d\'ajouter ce produit au panier ?') === true) {
                addBasket({"name": productName, "id": productId, "img": productImg, "size": productSize, "price": productNewPrice});
                setCartLength(cartLength => cartLength + 1);
                storage = JSON.parse(localStorage.getItem('basket'));
            }
            else {
                console.log('annulé');
            }
        }
        // eslint-disable-next-line 
    }, [checkCardPresence]);


    // Modification du bouton d'ajout au panier si produit présent dans le local storage
    useEffect(() => {
        const allDataId = document.querySelector(`.${productClass}`).getAttribute('data-id');
        const storage = JSON.parse(localStorage.getItem('basket'));
        
        if (storage.some((elt) => elt.id === allDataId) && !document.querySelector(`.${productClass} button`).classList.contains('selected')) {
            document.querySelector(`.${productClass} button`).classList.add('selected');
            setCancelBtn('pending');
        }

        else if (!document.querySelector(`.${productClass} button`).classList.contains('selected')) {
            setCancelBtn('none');
        }

        // eslint-disable-next-line 
    }, [addToBasket]);

    return (
        
        <div className={`product-card ${productClass}`} data-id={`${productId}`}>
            <div className="border-decoration">
                <img src={border} alt="bordure décorative bleu foncé" />
            </div>
            <div className="product-img" onMouseOver={() => setImgHover(true)} onMouseLeave={() => setImgHover(false)} onClick={displayProduct}>
                {(imgHover === false && isSold === false) ? 
                <img src={productImg} alt={productAlt} />     
                : (imgHover === false && isSold === true) ?
                    <div>
                        <img src={productImg} alt={productAlt} className="sold"/>
                        <span className="sold-sign">Vendu</span>
                    </div>
                : (imgHover === true && isSold === false) ?   
                <img src={productHover} alt={productAlt} />
                : (imgHover === true && isSold === true) ?
                    <div>
                        <img src={productHover} alt={productAlt} className="sold"/>
                        <span className="sold-sign">Vendu</span>
                    </div>
                : null }
            </div>
            <div className="product-line-container">
                <div className="product-line"></div>
            </div>
            <div className="product-content">
                <div className="product-text">
                    <h4>{productName}
                    {(isNew)?
                        <p>Nouveau !</p>
                        : <div className='invisible'></div> }
                    </h4>
                    <p className='product-size'>{productSize}</p>
                    <p className='artisan'>{productTribe}</p>
                    <p className='prices'>
                        <span className='old-price'>{productOldPrice}€</span>
                        <span className='new-price'>{productNewPrice}€</span>
                    </p>
                    <p className='economy'>{productOldPrice - productNewPrice}€ d'économies !</p>
                    <div className="add-basket-container">
                        {(cancelBtn === 'none' && isSold === false) ?
                        <>
                            <button className='add-basket-button' onClick={(() => {addToBasket(productId)})} >
                                <FontAwesomeIcon icon={faBasketShopping}/>
                                <p>Ajouter au panier</p>
                            </button>
                        </>
                        : (cancelBtn === 'pending' && isSold === false) ?
                            <button className='add-basket-button' onMouseEnter={() => setCancelBtn('present')}>
                                <p className='added'>
                                    <FontAwesomeIcon icon={faCartArrowDown} />
                                    Ajouté !
                                </p>
                            </button>
                        : (cancelBtn === 'present' && isSold === false) ?
                            <button className='add-basket-button' onClick={(() => {addToBasket(productId)})} onMouseLeave={() => setCancelBtn('pending')}>
                                <p className='cancelled'>
                                    <FontAwesomeIcon icon={faCircleXmark} />
                                    Annuler
                                </p>
                            </button>
                        : (isSold) ?
                            <button className='add-basket-button' >
                                <p className='sold'>
                                    <FontAwesomeIcon icon={faCircleXmark} />
                                    Plus en stock
                                </p>
                            </button>
                        : null
                        }   
                    </div>
                </div>
            </div>
            <div className="border-bottom-container"></div>
        </div> 
        
    );
};

export default Item;