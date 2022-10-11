import React, { useContext, useEffect } from 'react';

import { ProductContext } from '../pages/Products';

import carpet1 from '../media/products/Tapis/Tapis1/tapis1.webp';

const DetailedProduct = (products) => {

    const detail = useContext(ProductContext);
    const displayDetail = detail.displayDetail;
    const setDisplayDetail = detail.setDisplayDetail;

    const productSelected = products.products[0];
    

    function removeDetail() {
        setDisplayDetail(!displayDetail);
    }

    function zoomOnImg() {
        const selectZoomedImg = document.querySelector('.zoomed-img');
        const selectNormalImg = document.querySelector('.normal-img');
        selectZoomedImg.style.opacity = "1";
        selectNormalImg.style.opacity = "0";
    }

    function zoomOffImg() {
        const selectZoomedImg = document.querySelector('.zoomed-img');
        const selectNormalImg = document.querySelector('.normal-img');
        
        selectZoomedImg.style.opacity = "0";
        selectNormalImg.style.opacity = "1";
        selectZoomedImg.style.bottom = "0";
        selectZoomedImg.style.right = "0";
    }

    function moveImg(e) {
        console.log(`${e.clientX / 7}px`);
        const selectZoomedImg = document.querySelector('.zoomed-img');
        selectZoomedImg.style.right = `${e.clientX / 3}px`;
        selectZoomedImg.style.bottom = `${e.clientY / 1.5}px`;
        console.log("mouse location:", e.clientX, e.clientY)

    }


    useEffect(() => {
        
    }, [])

    return (
        <section className="detailed-product">
            <div className='detailed-card'>
                <div className="close-detail-container">
                    <span onClick={removeDetail}>Retour aux produits</span>
                    <span onClick={removeDetail}>ⵅ</span>
                </div>
                <div className="detailed-content">
                    <div className='main-info'>
                        <div className="detailed-img-container" onMouseOver={zoomOnImg} onMouseLeave={zoomOffImg} onMouseMove={function(e){moveImg(e)}}>
                            <img src={carpet1} alt="" className='zoomed-img'/>
                            <img src={carpet1} alt="" className='normal-img'/>
                        </div>
                        <div className="detailed-line-container">
                            <div className="line-container"></div>
                        </div>
                        <div className="detailed-text-container">
                            <div className="detailed-text">
                                <h2>Tapis berbère à rayures</h2>
                                <p className='product-size'>250 x 125 cm</p>
                                <p className='material'>Poil de chameau 100 %</p>
                                <p className='artisan'>Tribu Chefchaouen</p>
                                <p className='prices'>
                                    <span className='old-price'>490€</span>
                                    <span className='new-price'>250€</span>
                                </p>
                                <p className='economy'>économisez 140€ !</p>
                                <p className='delivery'>La livraison est <span>gratuite</span> pour tous nos tapis !</p>
                            </div>
                            <div className="button-container">
                                <button className="add-basket">
                                    Ajouter au panier !
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="detailed-carousel">
                    {(products !== undefined) ? 
                        productSelected[0].productAllImg.map((key) => {
                        return (
                            <img src={key.img} alt="" key={key.id}/>
                        )
                        })
                    : null }
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DetailedProduct;