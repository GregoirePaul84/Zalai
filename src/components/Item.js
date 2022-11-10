import React, { useCallback, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ProductContext } from '../pages/Products';

import border from '../media/border.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';


const Item = ({setCartLength, productClass, productName, productOldPrice, productNewPrice, productTribe, productSize, productImg, productHover, productAlt, addBasket, productId, isAdded}) => {

    const navigate = useNavigate();

    const detail = useContext(ProductContext);
    const displayDetail = detail.displayDetail;
    const setDisplayDetail = detail.setDisplayDetail;

    const [imgHover, setImgHover] = useState(false);

    function displayProduct() {
        setDisplayDetail(!displayDetail);
        navigate(`/products/${productId}`);
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
        if (checkCardPresence(id)) {
            alert('produit déjà dans le panier');
        }
        else {
            if(window.confirm('Etes vous sûr(e) d\'ajouter ce produit au panier ?') === true) {
                addBasket({"name": productName, "id": productId, "img": productImg, "size": productSize, "price": productNewPrice});
                setCartLength(cartLength => cartLength + 1);
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
            document.querySelector(`.${productClass} button`).innerHTML = '<p class="added"><i class="fa-solid fa-cart-arrow-down"></i>Ajouté !</p><p class="cancelled"><i class="fa-regular fa-circle-xmark"></i>Annuler</p>';
        }
        // eslint-disable-next-line 
    }, [addToBasket]);

    return (
        <>
        <div className={`product-card ${productClass}`} data-id={`${productId}`}>
            <div className="border-decoration">
                <img src={border} alt="" />
            </div>
            <div className="product-img" onMouseOver={() => setImgHover(true)} onMouseLeave={() => setImgHover(false)} onClick={displayProduct}>
                {(imgHover === false) ? 
                <img src={productImg} alt={productAlt} />     
                : <img src={productHover} alt={productAlt} /> }
            </div>
            <div className="product-line-container">
                <div className="product-line"></div>
            </div>
            <div className="product-content">
                <div className="product-text">
                    <h4>{productName}</h4>
                    <p className='product-size'>{productSize}</p>
                    <p className='artisan'>{productTribe}</p>
                    <p className='prices'>
                        <span className='old-price'>{productOldPrice}€</span>
                        <span className='new-price'>{productNewPrice}€</span>
                    </p>
                    <p className='economy'>{productOldPrice - productNewPrice}€ d'économies !</p>
                    <div className="add-basket-container">
                        <button className='add-basket-button' onClick={(() => {addToBasket(productId)})} >
                            <FontAwesomeIcon icon={faBasketShopping}/>
                            <p>Ajouter au panier</p>
                        </button>
                    </div>
                </div>
            </div>
            <div className="border-bottom-container"></div>
        </div> 
        </>
    );
};

export default Item;