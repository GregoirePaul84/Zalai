import React from 'react';

const Carpets = ({categoryName, productClass, productName, productImg, productAlt}) => {

    return (
        <>
        <div className={`product-card ${productClass}`}>
            <div className="product-img">
                <img src={productImg} alt={productAlt} />
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