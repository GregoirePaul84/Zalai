import React, { useContext, useState } from 'react';

import { ProductContext } from '../pages/Products';

const Carpets = ({productClass, productName, productImg, productHover, productAllImg, productAlt}) => {

    const detail = useContext(ProductContext);
    const displayDetail = detail.displayDetail;
    const setDisplayDetail = detail.setDisplayDetail;


    const [imgHover, setImgHover] = useState(false);
   

    function displayProduct() {
        setDisplayDetail(!displayDetail);
    }


    return (
        <>
        <div className={`product-card ${productClass}`}>
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
                    <p>170 x 250 cm</p>
                    <p>250 €</p>
                </div>
            </div>
        </div> 
        </>
    );
};

export default Carpets;