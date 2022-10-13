import React, { useEffect, useState } from 'react';

import Loader from './Loader';
import Header from '../components/Header';
import Carpets from '../components/Carpets';

import productsImg from '../media/blue-688874_1920.jpg';

import arrow from '../media/arrow_down.png';

import carpets from '../media/carpet-2458558_640.jpg';
import lamps from '../media/lampe.png';
import decorations from '../media/cloth-2777_640.jpg'

import mandala from '../media/mandala.png'

import carpet1 from '../media/products/Tapis/Tapis1/tapis1.webp';
import carpet1_2 from '../media/products/Tapis/Tapis1/tapis1_2.webp';
import carpet1_3 from '../media/products/Tapis/Tapis1/tapis1_3.webp';
import carpet1_4 from '../media/products/Tapis/Tapis1/tapis1_4.jpg';
import carpet1_5 from '../media/products/Tapis/Tapis1/tapis1_5.webp';
import carpet1_6 from '../media/products/Tapis/Tapis1/tapis1_6.jpg';

import carpet2 from '../media/products/Tapis/Tapis2/tapis2.webp';
import carpet2_2 from '../media/products/Tapis/Tapis2/tapis2_2.webp';
import carpet2_3 from '../media/products/Tapis/Tapis2/tapis2_3.webp';
import carpet2_4 from '../media/products/Tapis/Tapis2/tapis2_4.webp';
import carpet2_5 from '../media/products/Tapis/Tapis2/tapis2_5.webp';

import carpet3 from '../media/products/Tapis/Tapis3/tapis3.webp';
import carpet4 from '../media/products/Tapis/Tapis4/tapis4.webp';
import CategoryCard from '../components/CategoryCard';

import light1 from '../media/products/Luminaires/chams-lustre-marocain-suspendu-264.webp';
import light2 from '../media/products/Luminaires/CU07BO-1.webp';
import light3 from '../media/products/Luminaires/ilham-lustre-marocain-suspendu-952.webp';

import deco1 from '../media/products/Décoration/coussin-kilim-coussin-marocain-666.webp';
import deco2 from '../media/products/Décoration/coussin-orange-en-soie-de-cactus-coussin-marocain-798.webp';
import deco3 from '../media/products/Décoration/CSHD35SH-1.webp';
import Footer from '../components/Footer';
import DetailedProduct from '../components/DetailedProduct';

import { saveBasket, getBasket, addBasket } from '../functions/basket';

const productCategories = [
    {
        'categoryClass': 'carpets-container',
        'categoryName': 'Tapis',
        'categoryImg': carpets,
        'categoryAlt': 'choix de produit: tapis'
    },
    {
        'categoryClass': 'lamps-container',
        'categoryName': 'Luminaires',
        'categoryImg': lamps,
        'categoryAlt': 'choix de produit: luminaires'
    },
    {
        'categoryClass': 'decorations-container',
        'categoryName': 'Décorations',
        'categoryImg': decorations,
        'categoryAlt': 'choix de produit: décorations'
    }
];

const products = [
    // Tapis en stock
[   {
        'productId': '0',
        'productClass': 'tapis-berbère-1',
        'productName': 'Tapis berbère 1',
        'productOldPrice': 400,
        'productNewPrice': 250,
        'productImg': carpet1,
        'productHover': carpet1_2,
        'productAllImg': [{"id":"carpet1", "img":carpet1}, 
                            {"id":"carpet2", "img":carpet1_2}, 
                            {"id":"carpet3", "img":carpet1_3}, 
                            {"id":"carpet4", "img":carpet1_4}, 
                            {"id":"carpet5", "img":carpet1_5}, 
                            {"id":"carpet6", "img":carpet1_6}
                        ],

        'productAlt': 'Tapis berbère bleu à rayures'
    },
    {
        'productId': '1',
        'productClass': 'tapis-berbère-2',
        'productName': 'Tapis berbère 2',
        'productOldPrice': 430,
        'productNewPrice': 280,
        'productImg': carpet2,
        'productHover': carpet2_2,
        'productAllImg': [{"id":"carpet1", "img":carpet2}, 
                            {"id":"carpet2", "img":carpet2_2}, 
                            {"id":"carpet3", "img":carpet2_3}, 
                            {"id":"carpet4", "img":carpet2_4}, 
                            {"id":"carpet5", "img":carpet2_5}
                        ],
        'productAlt': 'choix de produit: luminaires'
    },
    {
        'productId': '2',
        'productClass': 'tapis-berbère-3',
        'productName': 'Tapis berbère 3',
        'productOldPrice': 475,
        'productNewPrice': 325,
        'productImg': carpet3,
        'productAlt': 'choix de produit: décorations'
    },
    {
        'productId': '3',
        'productClass': 'tapis-berbère-4',
        'productName': 'Tapis berbère 4',
        'productOldPrice': 345,
        'productNewPrice': 195,
        'productImg': carpet4,
        'productAlt': 'choix de produit: décorations'
    }
],

    // Luminaires en stock
[   {
    'productClass': 'light-1',
    'productName': 'lumière 1',
    'productImg': light1,
    'productAlt': 'lumière 1'
    },
    {
    'productClass': 'light-2',
    'productName': 'lumière 2',
    'productImg': light2,
    'productAlt': 'lumière 2'
    },
    {
    'productClass': 'light-3',
    'productName': 'lumière 3',
    'productImg': light3,
    'productAlt': 'lumière 3'
    }
],

    // Décorations en stock
    [   {
        'productClass': 'deco-1',
        'productName': 'décoration 1',
        'productImg': deco1,
        'productAlt': 'deco 1'
        },
        {
        'productClass': 'deco-2',
        'productName': 'décoration 2',
        'productImg': deco2,
        'productAlt': 'deco 2'
        },
        {
        'productClass': 'deco-3',
        'productName': 'décoration 3',
        'productImg': deco3,
        'productAlt': 'deco 3'
        }
    ]
];

export const ProductContext = React.createContext();

const Products = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [scrollY, setScrollY] = useState(0);
    const [category, setCategory] = useState(undefined);
    const [displayDetail, setDisplayDetail] = useState(false);

    function checkLoading() {
        setIsLoading(false);  
    }

    const handleScroll = () => {

        setScrollY(window.scrollY);
    
        if (scrollY > 100) {
          document.querySelector('.carpets-container').style.animation = '1s ease-in-out 0s 1 normal forwards running opacityProductCard';
          document.querySelector('.lamps-container').style.animation = '1s ease-in-out 500ms 1 normal forwards running opacityProductCard';
          document.querySelector('.decorations-container').style.animation = '1s ease-in-out 1s 1 normal forwards running opacityProductCard';
        }
    };

    const checkCategory = (name) => {
        
        if (name === 'tapis') {
            setCategory(0);
        }   
        if (name === 'luminaires') {
            setCategory(1);
        }   
        if (name === 'décorations') {
            setCategory(2);
        }   
    } 

    useEffect(() => {
        if (isLoading === false) {
            const selectLoader = document.getElementById('loader-container');
            const selectContainer = document.querySelector('.home-loader');

            setTimeout(() => {selectLoader.style.animation = '1s ease-in-out 0s 1 normal forwards running loaderDisappears'}, 2300);
            setTimeout(() => {selectContainer.classList.add('loader-cancelled')}, 3300);  
        }
   
    }, [isLoading])

    useEffect(() => {
        const selectForeground = document.querySelector('.foreground');
        const selectBackground = document.querySelector('.background');

        if(displayDetail) {     
            selectForeground.classList.add('foreground-blur');
            selectBackground.classList.add('foreground-blur');
        }
        else {
            selectForeground.classList.remove('foreground-blur');
            selectBackground.classList.remove('foreground-blur');
        }
        
    
    }, [displayDetail])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, {
        });
    
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };

    });

    return (
        <>
        <div className="home-loader">
                <Loader />
        </div>
        <div className='products-container'>
            <div className="background">
                <img src={productsImg} alt="Chefchaouen, Maroc" />
                <div className="gray-layout"></div>
            </div>
            <div className="foreground">
                <Header checkPage={'product'} />
                <main>
                    <section className="product-title">
                        <h3>Notre boutique en ligne</h3>   
                        <p>Des produits sélectionnés avec nos plus grands soins</p>          
                    </section>
                    <section className='arrow-container'>
                        <img src={arrow} alt="flèche pointant vers le bas" onLoad={checkLoading}/>
                    </section>
                    <section className='cards-container'>
                        {productCategories.map((key) => {
                            return (
                                <CategoryCard key={key.categoryName}
                                            categoryChosen={checkCategory}
                                            categoryClass={key.categoryClass}
                                            categoryName={key.categoryName}
                                            categoryImg={key.categoryImg}
                                            categoryAlt={key.categoryAlt} />
                            )
                        })
                        }
                    </section>
                    <section className="products-list-container">
                        <div className="products-list">
                            <div className="category-title-container">
                                <img src={mandala} alt="decoration florale" />
                                <h3 className='category-title'></h3>
                                <img src={mandala} alt="decoration florale" />
                            </div>
                            {(category !== undefined) ? 
                                products[category].map((key) => {
                                return(
                                    <ProductContext.Provider value={{ displayDetail, setDisplayDetail }} key={key.productName}>
                                        <Carpets key={key.productId}
                                        saveBasket={saveBasket}
                                        getBasket={getBasket}
                                        addBasket={addBasket}
                                        productId={key.productId}
                                        productClass={key.productClass}
                                        productName={key.productName}
                                        productOldPrice={key.productOldPrice}
                                        productNewPrice={key.productNewPrice}
                                        productImg={key.productImg}
                                        productHover={key.productHover}
                                        productAllImg={key.productAllImg}
                                        productAlt={key.productAlt}/>
                                    </ProductContext.Provider>
                                )
                                })
                            : 
                            null
                            }
                        </div>
                    </section>
                    <Footer />
                </main>
            </div>
            { (displayDetail) ?
                <ProductContext.Provider value={{ displayDetail, setDisplayDetail }}>
                    <DetailedProduct products={products}/>
                </ProductContext.Provider> 
            : null }
        </div>
        </>
    );
};

export default Products;