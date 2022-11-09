import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Loader from './Loader';

import { useNavigate } from 'react-router-dom';

import basketImg from '../media/pexels-meruyert-gonullu-6243732.jpg'
import { useRef } from 'react';

import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Basket = () => {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [scrollY, setScrollY] = useState(0);
    const [brightness, setBrightness] = useState(0.4);
    const [price, setPrice] = useState(0);

    const storageRef = useRef([]);

    const handleScroll = () => {
        setScrollY(window.scrollY);
    }

    // ==== GESTION DU LOADER ==== //

    // Désactivation du loader de page
    function checkLoading() {
        setIsLoading(false);  
    }

    // Disparition du loader vers la droite
    useEffect(() => {
        if (isLoading === false) {
            const selectLoader = document.getElementById('loader-container');
            const selectContainer = document.querySelector('.home-loader');

            setTimeout(() => {selectLoader.style.animation = '1s ease-in-out 1s 1 normal forwards running loaderDisappears'}, 2300);
            setTimeout(() => {
                selectContainer.classList.add('loader-cancelled');
            }, 4300);  
        }
   
    }, [isLoading]);

    useEffect(() => {
        
        if (scrollY >= 500) {
            setBrightness(1);

            return;
        }

        else {
            setBrightness(scrollY / 1000 + 0.4);
        }
        
    }, [scrollY, brightness])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, {
        });
    
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };

    });

    useEffect(() => {
        calculateBasket();
    }, []);
    
    // ==== CALCUL DU TOTAL DES PRODUITS ==== //

    function calculateBasket() {
        storageRef.current = JSON.parse(localStorage.getItem('basket'));
        console.log(storageRef.current);

        if (storageRef.current.length === 0) {
            setPrice(0);
        } 
        else {
            // Somme des prix de tous les produits en partant de 0
            const totalPrice = storageRef.current.reduce(function(result,item) {
                return result + item.price;
               }, 0);
               
            setPrice(totalPrice);     
        }
    }


    // ==== ANNULATION D'UN PRODUIT DU PANIER ==== //

    function cancelItem(id, name) {
        console.log(name);

        if(window.confirm('Etes vous sûr(e) de vouloir supprimer ce produit du panier ?') === true) {
            
            // Suppression du produit selon l'id
            storageRef.current = storageRef.current.filter((item) => item.id !== id || item.name !== name);

            // Suppression du local storage
            localStorage.setItem('basket', JSON.stringify(storageRef.current));
            calculateBasket();
        }
        else {
            console.log('annulé');
        }
    }

    function goShopping() {
        navigate(`/products`);
    }

    return (
        <>
            <div className="home-loader">
                    <Loader isLoading={isLoading} />
            </div>
            <div className='basket-container'>
                <div className="background">
                    <img src={basketImg} alt="Coussins et tapis" style={{filter: `brightness(${brightness})`}} onLoad={checkLoading}/>
                    {/* <div className="gray-layout" style={{backgroundColor: `rgba(58, 58, 58, 0.7})`}}></div> */}
                </div>
                <div className="foreground">
                    <Header checkPage={'about'} isLoading={isLoading} />
                    <main className='basket-main'> 
                        <section>
                            <div className="basket-header">
                                <div className="back-to-shopping">
                                    <button onClick={goShopping}>Continuer les achats</button>
                                </div>
                                <div className="basket-title">
                                    <h2>Votre panier</h2>
                                </div>
                                <div className="basket-border"></div>
                            </div>
                            <div className="basket-content">
                                <div className="type-info">
                                    <p>Produit</p>
                                    <p>Quantité</p>
                                    <p>Prix</p>
                                </div>
                                <div className="products-stored">
                                    {(storageRef.current.length !== 0) ?
                                        storageRef.current.map((key, index) => {
                                            return (
                                                <div className="product" key={index} data-id={key.id}>
                                                    <div className="product-infos">
                                                        <div className="product-img">
                                                            <img src={key.img} alt="" />
                                                        </div>
                                                        <div className="product-name-price">
                                                            <h4>{key.name}</h4>
                                                            <p>{key.size}</p>
                                                        </div> 
                                                    </div>
                                                    <div className="delete-product">
                                                        <h4>Produit unique</h4>
                                                        <FontAwesomeIcon icon={faTrash} onClick={() => {cancelItem(key.id, key.name)}} />
                                                    </div>
                                                    <div className="product-price">
                                                        <p>{key.price},00 €</p>
                                                    </div>
                                                </div>
                                            )
                                        })
                                        : <p className='empty-basket'>Votre panier est vide</p> }
                                </div>
                                <div className="payement-price">
                                    <div></div>
                                    <div className="payement-button">
                                        <button>Paiement</button>
                                    </div>
                                    <div className="total-price">
                                        <p>Total : {price},00 €</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </main>
                    <Footer />
                </div>
            </div>
        </>
    );
};

export default Basket;