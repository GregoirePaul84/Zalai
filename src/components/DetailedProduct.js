import React, { useCallback, useContext, useEffect, useState } from 'react';

import { ProductContext } from '../pages/Products';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong, faChevronLeft, faChevronRight, faPercent, faRuler, faTent, faCartArrowDown, faCircleXmark } from '@fortawesome/free-solid-svg-icons';

import { useNavigate, useParams } from 'react-router-dom';
import SmallLoader from './SmallLoader';


const DetailedProduct = ({products, categoryIndex, cartLength, setCartLength, addBasket}) => {

    const navigate = useNavigate();
    let { id } = useParams();
    const index = parseInt(id, 10);

    const detail = useContext(ProductContext);
    const displayDetail = detail.displayDetail;
    const setDisplayDetail = detail.setDisplayDetail;

    let productSelected = products[categoryIndex];
    const findProduct = productSelected.filter((product) => product.productId === index.toString())[0];

    const [imgIndex, setImgIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [cancelBtn, setCancelBtn] = useState('none');


    function checkLoading(){
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    };

    function removeDetail() {
        setDisplayDetail(!displayDetail);
        navigate(`/products`);
    };

    function zoomOnImg() {
        const selectZoomedImg = document.querySelector('.zoomed-img');
        const selectNormalImg = document.querySelector('.normal-img');

        selectZoomedImg.style.opacity = "1";
        selectNormalImg.style.opacity = "0";
    };

    function zoomOffImg() {
        const selectZoomedImg = document.querySelector('.zoomed-img');
        const selectNormalImg = document.querySelector('.normal-img');
        
        selectZoomedImg.style.opacity = "0";
        selectNormalImg.style.opacity = "1";
    };

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

    };

    function showNextImg() {
        console.log(productSelected[0].productAllImg[0].img);
        setImgIndex(imgIndex + 1);

        if(imgIndex === 5) setImgIndex(0);
    };

    function showPreviousImg() {
        console.log(productSelected[0].productAllImg[0].img);
        setImgIndex(imgIndex - 1);

        if(imgIndex === 0) setImgIndex(5);
    };

    function changeImg(e) {
        const imgSelected = e.target;
        const selectMainImgs = document.querySelectorAll('.detailed-img-container img');
       
        selectMainImgs.forEach((e) => {e.setAttribute('src', imgSelected.getAttribute('src'))});
        
        switch (e.target.getAttribute('class')) {
            case 'img1': setImgIndex(0);
                break;
            case 'img2': setImgIndex(1);
                break;
            case 'img3': setImgIndex(2);
                break;
            case 'img4': setImgIndex(3);
                break;
            case 'img5': setImgIndex(4);
                break;
            case 'img6': setImgIndex(5);
                break;
            default : console.log('image non disponible');
        }
    };

    useEffect(() => {
        if (document.querySelector('.normal-img').classList.contains(`${findProduct.productAllImg[imgIndex].id}`)) {
            const selectCarouselImg = document.querySelector(`.detailed-carousel .${findProduct.productAllImg[imgIndex].id}`);
            const selectOtherImgs = document.querySelectorAll(`.detailed-carousel img`);
            selectOtherImgs.forEach((e) => {e.classList.remove('selected-img')});
            selectCarouselImg.classList.add('selected-img');
        }
        // eslint-disable-next-line
    }, [imgIndex]);

    function checkCardPresence(id) {
        const cart = JSON.parse(localStorage.getItem('basket'));
        console.log(id);
        
        if (cart.some(item => item.id === id)) {
            return true;
        }
        else {
            return false;
        }
    };

    const addToBasket = useCallback((id) => {

        let storage = JSON.parse(localStorage.getItem('basket'));
        
        if (checkCardPresence(id)) {
            if(window.confirm('Etes vous sûr(e) de vouloir supprimer ce produit du panier ?') === true) {
                
                // Suppression du produit selon l'id
                storage = storage.filter((item) => item.id !== id);
                console.log(storage);

                // Suppression du produit du local storage
                localStorage.setItem('basket', JSON.stringify(storage));

                // Suppression de la classe 'selected'
                document.querySelector(`.detailed-product .add-basket-button`).classList.remove('selected');
                // console.log(document.querySelector(`[data-id='${id}'] button`));
                document.querySelector(`[data-id='${id}'] button`).classList.remove('selected');

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
                console.log(productSelected);
                addBasket({"name": findProduct.productName, "id": findProduct.productId, "img": findProduct.productImg, "size": findProduct.productSize, "price": findProduct.productNewPrice});
                setCartLength(cartLength => cartLength + 1);
            }
            else {
                console.log('annulé');
            }
        }
        // eslint-disable-next-line
    }, [checkCardPresence]);

    useEffect(() => {
        const storage = JSON.parse(localStorage.getItem('basket'));
        
        if (storage.some((item) => item.id === id) && !document.querySelector(".detailed-product .add-basket-button").classList.contains('selected')) {
            document.querySelector(`.detailed-product .add-basket-button`).classList.add('selected');
            setCancelBtn('pending');
        }
        // eslint-disable-next-line
    }, [addToBasket]);

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
                            <img src={findProduct.productAllImg[imgIndex].img} alt="" className='zoomed-img'/>
                            <img src={findProduct.productAllImg[imgIndex].img} alt="" className={`normal-img ${productSelected[0].productAllImg[imgIndex].id}`} onLoad={checkLoading}/>
                        </div>
                        <div className="chevron-container">
                                <FontAwesomeIcon icon={faChevronRight} className="chevron-right" onClick={showNextImg}/>
                        </div>
                        <div className="detailed-line-container">
                            <div className="line-container"></div>
                        </div>
                        <div className="detailed-text-container">
                            <div className="detailed-text">
                                <h2>{findProduct.productName}</h2>
                                <p className='product-size'>
                                    <FontAwesomeIcon icon={faRuler} />
                                    {findProduct.productSize}
                                </p>
                                <p className='material'>
                                    <FontAwesomeIcon icon={faPercent} />
                                    {findProduct.productComposition}
                                </p>
                                <p className='artisan'>
                                    <FontAwesomeIcon icon={faTent} />
                                    {findProduct.productTribe}
                                </p>
                                <p className='prices'>
                                    <span className='old-price'>{findProduct.productOldPrice}€</span>
                                    <span className='new-price'>{findProduct.productNewPrice}€</span>
                                </p>
                                <p className='economy'>économisez {findProduct.productOldPrice - findProduct.productNewPrice}€ !</p>
                                <p className='delivery'>La livraison est <span>gratuite</span> pour tous nos tapis !</p>
                            </div>
                            <div className="button-container">
                                {(cancelBtn === 'none' && findProduct.isSold === false) ?
                                <>
                                    <button className="add-basket-button" onClick={(() => {addToBasket()})}>
                                        Ajouter au panier !
                                    </button>
                                </>
                                : (cancelBtn === 'pending' && findProduct.isSold === false) ?
                                    <button className='add-basket-button' onMouseEnter={() => setCancelBtn('present')}>
                                        <p className='added'>
                                            <FontAwesomeIcon icon={faCartArrowDown} />
                                            Ajouté !
                                        </p>
                                    </button>
                                : (cancelBtn === 'present' && findProduct.isSold === false) ?
                                    <button className='add-basket-button' onClick={(() => {addToBasket(id)})} onMouseLeave={() => setCancelBtn('pending')}>
                                        <p className='cancelled'>
                                            <FontAwesomeIcon icon={faCircleXmark} />
                                            Annuler
                                        </p>
                                    </button>
                                : (findProduct.isSold) ?
                                    <button className='sold'>
                                        <p>
                                            <FontAwesomeIcon icon={faCircleXmark} />
                                            Plus en stock
                                        </p>
                                    </button>
                                : null
                                }   
                            </div>
                        </div>
                    </div>
                    <div className="detailed-carousel">
                        <div className="chevron-container">
                                <FontAwesomeIcon icon={faChevronLeft} className="chevron-left" onClick={showPreviousImg}/>
                        </div>
                        {(products !== undefined) ? 
                            findProduct.productAllImg.map((key) => {
                            return (
                                <img src={key.img} alt="" key={key.id} className={key.id} onClick={function(e){changeImg(e)}} onLoad={function(e){checkLoading(e)}}/>
                            )
                            })
                        : null }
                        <div className="chevron-container" onClick={showNextImg}>
                            <FontAwesomeIcon icon={faChevronRight} className="chevron-right" />
                        </div>
                    </div>   
                </div>
            </div>
        </section>
    );
};

export default DetailedProduct;