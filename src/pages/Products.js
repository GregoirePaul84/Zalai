import React, { useEffect, useState } from 'react';

// Importation des composants
import Loader from './Loader';
import Header from '../components/Header';
import CategoryCard from '../components/CategoryCard';
import Carpets from '../components/Carpets';
import Footer from '../components/Footer';
import DetailedProduct from '../components/DetailedProduct';

// Importation des images 
import productsImg from '../media/blue-688874_1920.jpg';
import arrow from '../media/arrow_down.png';
import mandala from '../media/mandala.png'

// Importation de la fake data
import { productCategories } from '../data/dataCategories';
import { products } from '../data/dataProducts';

// Importation des fonctions associées au panier
import { saveBasket, getBasket, addBasket } from '../functions/basket';

// Importation des icônes
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import FilterProducts from '../components/FilterProducts';

export const ProductContext = React.createContext();

const Products = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [scrollY, setScrollY] = useState(0);
    const [category, setCategory] = useState(undefined);
    const [categoryIndex, setCategoryIndex] = useState(undefined);
    const [displayDetail, setDisplayDetail] = useState(false);
    const [typeFilter, setTypeFilter] = useState(undefined);
    const [filtersUsed, setFiltersUsed] = useState([{type: "price", valueMin: undefined, valueMax: undefined, name: undefined}, {type: "size", value: undefined}, {type: "color", value: undefined}]);
    const [colorsArray, setColorsArray] = useState([{'id': 'white', 'isChecked': false}, {'id': 'black', 'isChecked': false}, {'id': 'gray', 'isChecked': false}, {'id': 'green', 'isChecked': false}, {'id': 'red', 'isChecked': false}, {'id': 'orange', 'isChecked': false}, {'id': 'yellow', 'isChecked': false}, {'id': 'blue', 'isChecked': false}, {'id': 'purple', 'isChecked': false}, {'id': 'maroon', 'isChecked': false}]);

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

    function removeFilters() {
        setFiltersUsed([{type: "price", valueMin: undefined, valueMax: undefined, selected: false}, {type: "size", value: undefined}, {type: "color", value: undefined}]);
    }

    useEffect(() => {
        console.log(filtersUsed);
        sessionStorage.setItem('price', JSON.stringify(filtersUsed[0]));
        sessionStorage.setItem('size', JSON.stringify(filtersUsed[1]));
        sessionStorage.setItem('color', JSON.stringify(filtersUsed[2]));

        if(filtersUsed[0].valueMin === undefined) {
            document.querySelector('.checkbox-filters').checked = false;
        }   
        else {
            sessionStorage.setItem('price', JSON.stringify(filtersUsed[0]));
            sessionStorage.setItem('size', JSON.stringify(filtersUsed[1]));
            sessionStorage.setItem('color', JSON.stringify(filtersUsed[2]));
            document.querySelector('.checkbox-filters').checked = true;
        }
        
    }, [filtersUsed]);

    
    
    useEffect(() => {
        if (typeFilter === 'size')
            document.querySelector('.filter-container').style.borderRadius = '10px 10px 0 0';
        else 
            document.querySelector('.filter-container').style.borderRadius = '10px';
    }, [typeFilter]);

    useEffect(() => {
        if (isLoading === false) {
            const selectLoader = document.getElementById('loader-container');
            const selectContainer = document.querySelector('.home-loader');

            setTimeout(() => {selectLoader.style.animation = '1s ease-in-out 1s 1 normal forwards running loaderDisappears'}, 2300);
            setTimeout(() => {selectContainer.classList.add('loader-cancelled')}, 4300);  
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

        if(category === 0) setCategoryIndex(0);
        if(category === 1) setCategoryIndex(1);
        if(category === 2) setCategoryIndex(2);
         
    }, [category])

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
                                <div className="title-filter-container">
                                    <h3 className='category-title'></h3>
                                    <div className="filter-container">
                                        <p>Trier les produits</p>
                                        <input type="checkbox" className='checkbox-filters' onClick={removeFilters}/>
                                        <ul>
                                            <li onMouseOver={() => {setTypeFilter('price')}} >
                                                <span>Prix</span>
                                                <FontAwesomeIcon icon={faChevronDown} />
                                                {(typeFilter === 'price') ? <FilterProducts typeFilter={'price'} setTypeFilter={setTypeFilter} filtersUsed={filtersUsed} setFiltersUsed={setFiltersUsed}/> : null}
                                            </li>
                                            <li onMouseOver={() => {setTypeFilter('size')}}>
                                                <span>Taille</span>
                                                <FontAwesomeIcon icon={faChevronDown} />
                                                {(typeFilter=== 'size') ? <FilterProducts typeFilter={'size'} setTypeFilter={setTypeFilter} filtersUsed={filtersUsed} setFiltersUsed={setFiltersUsed}/> : null}
                                            </li>
                                            <li onMouseOver={() => {setTypeFilter('color')}}>
                                                <span>Couleur</span>
                                                <FontAwesomeIcon icon={faChevronDown} />
                                                {(typeFilter=== 'color') ? <FilterProducts typeFilter={'color'} setTypeFilter={setTypeFilter} filtersUsed={filtersUsed} setFiltersUsed={setFiltersUsed} colorsArray={colorsArray} setColorsArray={setColorsArray}/> : null}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <img src={mandala} alt="decoration florale" />
                            </div>
                            {(category !== undefined && filtersUsed[0].valueMin === undefined) ? 
                                products[category].map((key) => {
                                    return(
                                        <ProductContext.Provider value={{ displayDetail, setDisplayDetail }} key={key.productName}>
                                            <Carpets key={key.productId}
                                            saveBasket={saveBasket}
                                            getBasket={getBasket}
                                            addBasket={addBasket}
                                            productCategory={key.productCategory}
                                            productId={key.productId}
                                            productClass={key.productClass}
                                            productName={key.productName}
                                            productOldPrice={key.productOldPrice}
                                            productNewPrice={key.productNewPrice}
                                            productTribe={key.productTribe}
                                            productSize={key.productSize}
                                            productImg={key.productImg}
                                            productHover={key.productHover}
                                            productAllImg={key.productAllImg}
                                            productAlt={key.productAlt}/>
                                        </ProductContext.Provider>
                                    )
                                })
                            : 
                            products[0].filter((product) => product.productNewPrice >= filtersUsed[0].valueMin && product.productNewPrice <= filtersUsed[0].valueMax).map((key) => {
                                    return(
                                        <ProductContext.Provider value={{ displayDetail, setDisplayDetail }} key={key.productName}>
                                            <Carpets key={key.productId}
                                            saveBasket={saveBasket}
                                            getBasket={getBasket}
                                            addBasket={addBasket}
                                            productCategory={key.productCategory}
                                            productId={key.productId}
                                            productClass={key.productClass}
                                            productName={key.productName}
                                            productOldPrice={key.productOldPrice}
                                            productNewPrice={key.productNewPrice}
                                            productTribe={key.productTribe}
                                            productSize={key.productSize}
                                            productImg={key.productImg}
                                            productHover={key.productHover}
                                            productAllImg={key.productAllImg}
                                            productAlt={key.productAlt}/>
                                        </ProductContext.Provider>
                                    )
                                })
                            }
                        </div>
                    </section>
                    <Footer />
                </main>
            </div>
            { (displayDetail) ?
                <ProductContext.Provider value={{ displayDetail, setDisplayDetail }}>
                    <DetailedProduct products={products} categoryIndex={categoryIndex} mandalaImg={mandala}/>
                </ProductContext.Provider> 
            : null }
        </div>
        </>
    );
};

export default Products;