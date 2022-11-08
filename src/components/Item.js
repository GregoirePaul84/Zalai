import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ProductContext } from '../pages/Products';

import border from '../media/border.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons';


const Item = ({productCategory, productClass, productName, productOldPrice, productNewPrice, productTribe, productSize, productImg, productHover, productAlt, addBasket, productId}) => {

    const navigate = useNavigate();

    const detail = useContext(ProductContext);
    const displayDetail = detail.displayDetail;
    const setDisplayDetail = detail.setDisplayDetail;

    const [imgHover, setImgHover] = useState(false);

    function displayProduct() {
        setDisplayDetail(!displayDetail);
        navigate(`/products/${productId}`);
    }

    function addToBasket() {
        
        if(window.confirm('Etes vous sûr(e) d\'ajouter ce produit au panier ?') === true) {
            console.log('confirmé');
            addBasket({"name": productName, "id": productId, "img": productImg, "size": productSize, "price": productNewPrice})
        }
        else {
            console.log('annulé');
        }
    }

    return (
        <>
        <div className={`product-card ${productClass}`}>
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
                        <button className='add-basket-button' onClick={(() => {addToBasket()})}>
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