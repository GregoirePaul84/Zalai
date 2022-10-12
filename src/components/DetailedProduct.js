import React, { useContext, useEffect, useState } from 'react';

import { ProductContext } from '../pages/Products';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';


const DetailedProduct = (products) => {

    const detail = useContext(ProductContext);
    const displayDetail = detail.displayDetail;
    const setDisplayDetail = detail.setDisplayDetail;

    const productSelected = products.products[0];
    
    const [imgIndex, setImgIndex] = useState(0);

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
        // selectZoomedImg.style.bottom = "0";
        // selectZoomedImg.style.right = "25px";
    }

    function moveImg(e) {
        const selectZoomedImg = document.querySelector('.zoomed-img');
        const x = e.pageX - e.currentTarget.clientWidth; 
        let y = e.pageY - e.currentTarget.clientHeight;

        if(y - 830 > 0) {
            selectZoomedImg.style.bottom = `${y - 830}px`;
            
            
            if( y - 830 >= 151) {
                selectZoomedImg.style.bottom = '151px';   
            }
        }

        if(y - 830 < 0) {
            selectZoomedImg.style.bottom = `${y - 830}px`;
            
            
            if( y - 830 <= -149) {
                selectZoomedImg.style.bottom = '-149px';   
            }
        }
        
        
        selectZoomedImg.style.right = `${x + 40}px`;
        

        console.log(y - 830);

        if(x + 40 >= 126) selectZoomedImg.style.right = '126px';
        if(x + 40 <= -87) selectZoomedImg.style.right = '-87px';

        // if(y - 522 <= -283) selectZoomedImg.style.bottom = '-149px';
    }

    function showNextImg() {
        console.log(productSelected[0].productAllImg[0].img);
        setImgIndex(imgIndex + 1);

        if(imgIndex === 5) setImgIndex(0);
    }

    function showPreviousImg() {
        console.log(productSelected[0].productAllImg[0].img);
        setImgIndex(imgIndex - 1);

        if(imgIndex === 0) setImgIndex(5);
    }


    // useEffect(() => {
        
    // }, [])

    return (
        <section className="detailed-product">
            <div className='detailed-card'>
                <div className="close-detail-container">
                    <span onClick={removeDetail}>Retour aux produits</span>
                    <span onClick={removeDetail}>ⵅ</span>
                </div>
                <div className="detailed-content">
                    <div className='main-info'>
                        <div className="chevron-container">
                            <FontAwesomeIcon icon={faChevronLeft} className="chevron-left" onClick={showPreviousImg}/>
                        </div>
                        <div className="detailed-img-container" onMouseOver={zoomOnImg} onMouseLeave={zoomOffImg} onMouseMove={function(e){moveImg(e)}}>
                            <img src={productSelected[0].productAllImg[imgIndex].img} alt="" className='zoomed-img'/>
                            <img src={productSelected[0].productAllImg[imgIndex].img} alt="" className='normal-img'/>
                        </div>
                        <div className="chevron-container">
                                <FontAwesomeIcon icon={faChevronRight} className="chevron-right" onClick={showNextImg}/>
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
                        <div className="chevron-container">
                                <FontAwesomeIcon icon={faChevronLeft} className="chevron-left" onClick={showPreviousImg}/>
                        </div>
                        {(products !== undefined) ? 
                            productSelected[0].productAllImg.map((key) => {
                            return (
                                <img src={key.img} alt="" key={key.id}/>
                            )
                            })
                        : null }
                        <div className="chevron-container">
                            <FontAwesomeIcon icon={faChevronRight} className="chevron-right" onClick={showNextImg}/>
                        </div>
                    </div>   
                </div>
            </div>
        </section>
    );
};

export default DetailedProduct;