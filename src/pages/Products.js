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

    const [filterActive, setFilterActive] = useState({price: false, size: false, color: false});

    const [priceFilter, setPriceFilter] = useState({valueMin: undefined, valueMax: undefined, name: undefined});

    const [sizeFilter, setSizeFilter] = useState({value: undefined});

    const [colorFilter, setColorFilter] = useState([{'id': 'white', 'isChecked': false}, {'id': 'black', 'isChecked': false}, {'id': 'gray', 'isChecked': false}, {'id': 'green', 'isChecked': false}, {'id': 'red', 'isChecked': false}, {'id': 'orange', 'isChecked': false}, {'id': 'yellow', 'isChecked': false}, {'id': 'blue', 'isChecked': false}, {'id': 'purple', 'isChecked': false}, {'id': 'maroon', 'isChecked': false}]);




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
            setTimeout(() => {selectContainer.classList.add('loader-cancelled')}, 4300);  
        }
   
    }, [isLoading]);




    // ==== APPARITION DES CARDS + GESTION D'AFFICHAGE PRODUITS ==== //

    // Apparition des cards catégories lors du scroll
    const handleScroll = () => {

        setScrollY(window.scrollY);
    
        if (scrollY > 100) {
          document.querySelector('.carpets-container').style.animation = '1s ease-in-out 0s 1 normal forwards running opacityProductCard';
          document.querySelector('.lamps-container').style.animation = '1s ease-in-out 500ms 1 normal forwards running opacityProductCard';
          document.querySelector('.decorations-container').style.animation = '1s ease-in-out 1s 1 normal forwards running opacityProductCard';
        }
    };

    // Assignation de la catégorie lors du clic sur l'une des catégories de produits
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
    };

    // Assignation de l'index afin d'afficher la bonne catégorie de produits
    useEffect(() => {

        if(category === 0) setCategoryIndex(0);
        if(category === 1) setCategoryIndex(1);
        if(category === 2) setCategoryIndex(2);
         
    }, [category]);

    // Apparition de l'effet de flou lors de la visualisation détaillée d'un produit
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
    }, [displayDetail]);



    // ==== GESTION DE L'INPUT ANNULATION DES FILTRES ==== //

    // Cochage de l'input si au moins un filtre activé, décochage + actualisation du session storage si aucun filtre
    useEffect(() => {
        console.log(filterActive);
        if(filterActive.price || filterActive.size || filterActive.color) {
            document.querySelector('.checkbox-filters').checked = true;
        }
        else {
            document.querySelector('.checkbox-filters').checked = false;
            
            sessionStorage.setItem('price', JSON.stringify(priceFilter));

            sessionStorage.setItem('color', JSON.stringify(colorFilter));  
        }  

    }, [removeFilters, filterActive, priceFilter, colorFilter]);

    // Annule tous les filtres en réinitialisant au state initial
    function removeFilters() {

        setPriceFilter({valueMin: undefined, valueMax: undefined, name: undefined});

        setColorFilter(([{'id': 'white', 'isChecked': false}, {'id': 'black', 'isChecked': false}, {'id': 'gray', 'isChecked': false}, {'id': 'green', 'isChecked': false}, {'id': 'red', 'isChecked': false}, {'id': 'orange', 'isChecked': false}, {'id': 'yellow', 'isChecked': false}, {'id': 'blue', 'isChecked': false}, {'id': 'purple', 'isChecked': false}, {'id': 'maroon', 'isChecked': false}]));

        setFilterActive({price: false, size: false, color: false});
        
    }

    

    
    useEffect(() => {
        if (typeFilter === 'size')
            document.querySelector('.filter-container').style.borderRadius = '10px 10px 0 0';
        else 
            document.querySelector('.filter-container').style.borderRadius = '10px';
    }, [typeFilter]);


    
    // Détection du scroll
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
                                                {(typeFilter === 'price') ? <FilterProducts typeFilter={'price'} filterActive={filterActive} setFilterActive={setFilterActive} setTypeFilter={setTypeFilter} priceFilter={priceFilter} setPriceFilter={setPriceFilter}/> : null}
                                            </li>
                                            <li onMouseOver={() => {setTypeFilter('size')}}>
                                                <span>Taille</span>
                                                <FontAwesomeIcon icon={faChevronDown} />
                                                {(typeFilter=== 'size') ? <FilterProducts typeFilter={'size'} setTypeFilter={setTypeFilter}/> : null}
                                            </li>
                                            <li onMouseOver={() => {setTypeFilter('color')}}>
                                                <span>Couleur</span>
                                                <FontAwesomeIcon icon={faChevronDown} />
                                                {(typeFilter=== 'color') ? <FilterProducts typeFilter={'color'} setTypeFilter={setTypeFilter} filterActive={filterActive} setFilterActive={setFilterActive} colorFilter={colorFilter} setColorFilter={setColorFilter}/> : null}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <img src={mandala} alt="decoration florale" />
                            </div>
                            {(category !== undefined && priceFilter.name === undefined) ? 
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
                            products[0].filter((product) => product.productNewPrice >= priceFilter.valueMin && product.productNewPrice <= priceFilter.valueMax).map((key) => {
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