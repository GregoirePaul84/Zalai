import React, { useContext } from 'react';

import { ProductContext } from '../pages/Products';

const DetailedProduct = () => {

    const detail = useContext(ProductContext);
    const displayDetail = detail.displayDetail;
    const setDisplayDetail = detail.setDisplayDetail;

    function removeDetail() {
        setDisplayDetail(!displayDetail);
    }

    return (
        <section className="detailed-product">
            <div className='detailed-card'>
                <div className="close-detail-container">
                    <span onClick={removeDetail}>Retour aux produits</span>
                    <span onClick={removeDetail}>ⵅ</span>
                </div>
                <div className="detailed-content">
                    <div>
                        <div className="detailed-img-container">
                            <img src="" alt="" />
                        </div>
                        <div className="detailed-line-container"></div>
                        <div className="detailed-text-container"></div>
                    </div>
                    <div></div>
                </div>
                {/* <div className="product-carousel">
                    {(productAllImg !== undefined) ? 
                        productAllImg.map((key) => {
                        return (
                            <img src={key} alt="" key={key.index}/>
                        )
                        })
                        : null }
                </div> */}
            </div>
        </section>
    );
};

export default DetailedProduct;