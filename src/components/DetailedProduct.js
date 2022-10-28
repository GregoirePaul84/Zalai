import React, { useContext, useEffect, useState } from 'react';

import { ProductContext } from '../pages/Products';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong, faChevronLeft, faChevronRight, faPercent, faRuler, faTent } from '@fortawesome/free-solid-svg-icons';

import { useNavigate, useParams } from 'react-router-dom';
import SmallLoader from './SmallLoader';


const DetailedProduct = ({products, categoryIndex}) => {

    const navigate = useNavigate();
    let { id } = useParams();
    const index = parseInt(id, 10);

    const detail = useContext(ProductContext);
    const displayDetail = detail.displayDetail;
    const setDisplayDetail = detail.setDisplayDetail;

    let productSelected = products[categoryIndex];

    const [imgIndex, setImgIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    function checkLoading(e){
        const selectSmallLoader = document.querySelector('.small-loader-container');
        setTimeout(() => {
            selectSmallLoader.style.display = 'none';
        }, 1000);
    }

    function removeDetail() {
        setDisplayDetail(!displayDetail);
        navigate(`/products`);
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
    }

    function moveImg(e) {
        const selectZoomedImg = document.querySelector('.zoomed-img');

        let rect = e.target.getBoundingClientRect();
        let x = e.clientX - rect.left; 
        let y = e.clientY - rect.top;  

        selectZoomedImg.style.right = `${x - 200}px`;
        selectZoomedImg.style.bottom = `${y - 200}px`;
        
        if (x - 200 <= -84.75) selectZoomedImg.style.right = "-84.75px";
        if (x - 200 >= 123.82) selectZoomedImg.style.right = "123.82px";

        if (y - 200 <= -120.40) selectZoomedImg.style.bottom = "-120.40px";
        if (y - 200 >= 149.59) selectZoomedImg.style.bottom = "149.59px";

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

    function changeImg(e) {
        const imgSelected = e.target;
        const selectMainImgs = document.querySelectorAll('.detailed-img-container img');
        console.log(e.target.getAttribute('class'));
        selectMainImgs.forEach((e) => {e.setAttribute('src', imgSelected.getAttribute('src'))});
        
        switch (e.target.getAttribute('class')) {
            case 'carpet1': setImgIndex(0);
                break;
            case 'carpet2': setImgIndex(1);
                break;
            case 'carpet3': setImgIndex(2);
                break;
            case 'carpet4': setImgIndex(3);
                break;
            case 'carpet5': setImgIndex(4);
                break;
            case 'carpet6': setImgIndex(5);
                break;
        }
    }

    useEffect(() => {
        if (document.querySelector('.normal-img').classList.contains(`${productSelected[index].productAllImg[imgIndex].id}`)) {
            const selectCarouselImg = document.querySelector(`.detailed-carousel .${productSelected[index].productAllImg[imgIndex].id}`);
            const selectOtherImgs = document.querySelectorAll(`.detailed-carousel img`);
            selectOtherImgs.forEach((e) => {e.classList.remove('selected-img')});
            selectCarouselImg.classList.add('selected-img');
        }
    }, [imgIndex]);

    console.log(imgIndex);

    return (
        <section className="detailed-product">
            <div className='detailed-card'>
                <div className="close-detail-container">
                    <span onClick={removeDetail}>
                        <FontAwesomeIcon icon={faArrowLeftLong} />
                        Retour aux produits
                    </span>
                    <span onClick={removeDetail}>ⵅ</span>
                </div>
                {(isLoading) ? 
                <div className='small-loader-container'>
                    <SmallLoader />
                </div>
                : null }
                <div className="detailed-content">
                    <div className='main-info'>
                        <div className="chevron-container">
                            <FontAwesomeIcon icon={faChevronLeft} className="chevron-left" onClick={showPreviousImg}/>
                        </div>
                        <div className="detailed-img-container" onMouseOver={zoomOnImg} onMouseLeave={zoomOffImg} onMouseMove={function(e){moveImg(e)}}>
                            <img src={productSelected[index].productAllImg[imgIndex].img} alt="" className='zoomed-img'/>
                            <img src={productSelected[index].productAllImg[imgIndex].img} alt="" className={`normal-img ${productSelected[0].productAllImg[imgIndex].id}`} onLoad={checkLoading}/>
                        </div>
                        <div className="chevron-container">
                                <FontAwesomeIcon icon={faChevronRight} className="chevron-right" onClick={showNextImg}/>
                        </div>
                        <div className="detailed-line-container">
                            <div className="line-container"></div>
                        </div>
                        <div className="detailed-text-container">
                            <div className="detailed-text">
                                <h2>{productSelected[index].productName}</h2>
                                <p className='product-size'>
                                    <FontAwesomeIcon icon={faRuler} />
                                    {productSelected[index].productSize}
                                </p>
                                <p className='material'>
                                    <FontAwesomeIcon icon={faPercent} />
                                    {productSelected[index].productComposition}
                                </p>
                                <p className='artisan'>
                                    <FontAwesomeIcon icon={faTent} />
                                    {productSelected[index].productTribe}
                                </p>
                                <p className='prices'>
                                    <span className='old-price'>{productSelected[index].productOldPrice}€</span>
                                    <span className='new-price'>{productSelected[index].productNewPrice}€</span>
                                </p>
                                <p className='economy'>économisez {productSelected[index].productOldPrice - productSelected[index].productNewPrice}€ !</p>
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
                            productSelected[index].productAllImg.map((key) => {
                            return (
                                <img src={key.img} alt="" key={key.id} className={key.id} onClick={function(e){changeImg(e)}} onLoad={function(e){checkLoading(e)}}/>
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