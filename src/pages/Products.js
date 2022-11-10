import React, { useEffect, useRef, useState } from 'react';

// Importation des composants
import Loader from './Loader';
import Header from '../components/Header';
import CategoryCard from '../components/CategoryCard';
import Item from '../components/Item';
import Footer from '../components/Footer';
import DetailedProduct from '../components/DetailedProduct';

// Importation des images 
import productsImg from '../media/blue-688874_1920.jpg';
import arrow from '../media/arrow_down.png';

// Importation de la fake data
import { productCategories } from '../data/dataCategories';
import { products } from '../data/dataProducts';

// Importation des fonctions associées au panier
import { saveBasket, getBasket, addBasket } from '../functions/basket';

// Importation des icônes
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import FilterProducts from '../components/FilterProducts';

import { useNavigate } from 'react-router-dom';

export const ProductContext = React.createContext();

const Products = () => {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [brightness, setBrightness] = useState(0.4);
    const [scrollY, setScrollY] = useState(0);
    const [category, setCategory] = useState(undefined);
    const [categoryIndex, setCategoryIndex] = useState(undefined);
    const [displayDetail, setDisplayDetail] = useState(false);
    const [typeFilter, setTypeFilter] = useState(undefined);
    const [cartLength, setcartLength] = useState(JSON.parse(localStorage.getItem('basket')).length);
    const [filterActive, setFilterActive] = useState({price: false, size: false, color: false, kind: false, material: false});

    // Filtre de prix
    const [priceFilter, setPriceFilter] = useState({valueMin: undefined, valueMax: undefined, name: undefined});

    // Filtre de tailles
    const [sizeFilter, setSizeFilter] = useState({size: undefined, name: undefined});

    // Filtre de couleurs
    const [colorFilter, setColorFilter] = useState([{'id': 'white', 'isChecked': false}, {'id': 'black', 'isChecked': false}, {'id': 'gray', 'isChecked': false}, {'id': 'green', 'isChecked': false}, {'id': 'red', 'isChecked': false}, {'id': 'orange', 'isChecked': false}, {'id': 'yellow', 'isChecked': false}, {'id': 'blue', 'isChecked': false}, {'id': 'purple', 'isChecked': false}, {'id': 'maroon', 'isChecked': false}]);

    // Filtre de genre
    const [kindFilter, setKindFilter] = useState({kind: undefined, name: undefined});

    // Filtre de matériau
    const [materialFilter, setMaterialFilter] = useState({material: undefined, name: undefined});

    // Index d'images de produits afin de gérer l'affichage précédent / suivant
    const [indexStart, setIndexStart] = useState(0);
    const [indexEnd, setIndexEnd] = useState(8);

    const colorsChosen = useRef();
    
    function hideFilter() {
        setTypeFilter(undefined);
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
            setTimeout(() => {selectContainer.classList.add('loader-cancelled')}, 4300);  
        }
   
    }, [isLoading]);


    // ==== GESTION DE LA LUMINOSITE ==== //

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
    function checkCategory(name) {
        
        if (name === 'tapis') {
            setCategory(0);
            setPriceFilter({valueMin: undefined, valueMax: undefined, name: undefined});
            setColorFilter([{'id': 'white', 'isChecked': false}, {'id': 'black', 'isChecked': false}, {'id': 'gray', 'isChecked': false}, {'id': 'green', 'isChecked': false}, {'id': 'red', 'isChecked': false}, {'id': 'orange', 'isChecked': false}, {'id': 'yellow', 'isChecked': false}, {'id': 'blue', 'isChecked': false}, {'id': 'purple', 'isChecked': false}, {'id': 'maroon', 'isChecked': false}]);
        }   
        if (name === 'luminaires') {
            setCategory(1);
            setPriceFilter({valueMin: undefined, valueMax: undefined, name: undefined});
        }   
        if (name === 'décorations') {
            setCategory(2);
            setPriceFilter({valueMin: undefined, valueMax: undefined, name: undefined});
            setColorFilter([{'id': 'white', 'isChecked': false}, {'id': 'black', 'isChecked': false}, {'id': 'gray', 'isChecked': false}, {'id': 'green', 'isChecked': false}, {'id': 'red', 'isChecked': false}, {'id': 'orange', 'isChecked': false}, {'id': 'yellow', 'isChecked': false}, {'id': 'blue', 'isChecked': false}, {'id': 'purple', 'isChecked': false}, {'id': 'maroon', 'isChecked': false}]);
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
        
        if(filterActive.price || filterActive.size || filterActive.color || filterActive.kind || filterActive.material) {
            document.querySelector('.checkbox-filters').checked = true;
        }
        else {
            document.querySelector('.checkbox-filters').checked = false;
            
            sessionStorage.setItem('price', JSON.stringify(priceFilter));
            sessionStorage.setItem('size', JSON.stringify(sizeFilter));
            sessionStorage.setItem('color', JSON.stringify(colorFilter)); 
            sessionStorage.setItem('kind', JSON.stringify(kindFilter));
            sessionStorage.setItem('material', JSON.stringify(materialFilter));  
        }  

    }, [filterActive, priceFilter, sizeFilter, colorFilter, kindFilter, materialFilter]);


    // Annule tous les filtres en réinitialisant au state initial
    function removeFilters() {

        setPriceFilter({valueMin: undefined, valueMax: undefined, name: undefined});

        setSizeFilter({size: undefined, name: undefined});

        setColorFilter(([{'id': 'white', 'isChecked': false}, {'id': 'black', 'isChecked': false}, {'id': 'gray', 'isChecked': false}, {'id': 'green', 'isChecked': false}, {'id': 'red', 'isChecked': false}, {'id': 'orange', 'isChecked': false}, {'id': 'yellow', 'isChecked': false}, {'id': 'blue', 'isChecked': false}, {'id': 'purple', 'isChecked': false}, {'id': 'maroon', 'isChecked': false}]));

        setKindFilter({kind: undefined, name: undefined});

        setMaterialFilter({material: undefined, name: undefined});

        setFilterActive({price: false, size: false, color: false, kind: false, material: false});
    }



    // ==== GESTION DU CHOIX DE COULEURS ==== //

    useEffect(() => {
        let colorsArray = [];
        const colorStorage = JSON.parse(sessionStorage.getItem('color'));
        const checkedColors = colorStorage.filter(clrs => clrs.isChecked === true);
        checkedColors.forEach(clrs => colorsArray.push(clrs.id));
        colorsChosen.current = colorsArray;
        
    }, [colorFilter]);

    
    // ==== DETECTION DU SCROLL ==== //
    useEffect(() => {
        window.addEventListener('scroll', handleScroll, {
        });
    
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };

    });

    // ==== AFFICHAGE DE L'INDEX DE LA PAGE PRODUITS ==== //

    useEffect(() => {
        if (indexStart === 0) {
            document.querySelector('.first-page').style.backgroundColor = '#D9A569';
            document.querySelector('.first-page').style.cursor = 'default';
            document.querySelector('.second-page').style.backgroundColor = 'rgb(59, 131, 155)';
            document.querySelector('.second-page').style.cursor = 'pointer';
        }
        else if (indexStart === 8) {
            document.querySelector('.first-page').style.backgroundColor = 'rgb(59, 131, 155)';
            document.querySelector('.first-page').style.cursor = 'pointer';
            document.querySelector('.second-page').style.backgroundColor = '#D9A569';
            document.querySelector('.second-page').style.cursor = 'default';
        }
    }, [indexStart]);
    
    return (
        <>
        <div className="home-loader">
                <Loader />
        </div>
        <div className='products-container'>
            <div className="background">
                <img src={productsImg} alt="Chefchaouen, Maroc" style={{filter: `brightness(${brightness})`}}/>
                {/* <div className="gray-layout"></div> */}
            </div>
            <div className="foreground">
                <div className="cart-info">
                    <span className='number-items'>{cartLength}</span>
                    <FontAwesomeIcon icon={faCartArrowDown} onClick={() => navigate(`/basket`)}/>
                </div>
                <Header checkPage={'product'} isLoading={isLoading}/>
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
                                category = {category}
                                            categoryChosen={checkCategory}
                                            categoryClass={key.categoryClass}
                                            categoryName={key.categoryName}
                                            categoryImg={key.categoryImg}
                                            categoryAlt={key.categoryAlt} />
                            )
                        })
                        }
                    </section>
                    <section id="products-list-container">
                        <div className="products-border"></div>
                        <div className="products-list">
                            <div className="category-title-container">
                                <div className="title-filter-container">
                                    {/* eslint-disable-next-line */}
                                    <h3 className='category-title'></h3>
                                    <div className="filter-container" onMouseOut={hideFilter}>
                                        <p>Trier les produits</p>
                                        <input type="checkbox" className='checkbox-filters' onClick={removeFilters}/>
                                        <ul>
                                            <li onMouseOver={() => {setTypeFilter('price')}} >
                                                <span>Prix</span>
                                                <FontAwesomeIcon icon={faChevronDown} />
                                                {(typeFilter === 'price') ? <FilterProducts category={category} typeFilter={'price'} setTypeFilter={setTypeFilter} filterActive={filterActive} setFilterActive={setFilterActive} priceFilter={priceFilter} setPriceFilter={setPriceFilter} /> : null}
                                            </li>
                                            { (category === 0) ?
                                            <>
                                            <li onMouseOver={() => {setTypeFilter('size')}}>
                                                <span>Taille</span>
                                                <FontAwesomeIcon icon={faChevronDown} />
                                                {(typeFilter === 'size') ? <FilterProducts category={category} typeFilter={'size'} setTypeFilter={setTypeFilter} filterActive={filterActive} setFilterActive={setFilterActive} sizeFilter={sizeFilter} setSizeFilter={setSizeFilter} /> : null}
                                            </li>
                                            <li onMouseOver={() => {setTypeFilter('color')}}>
                                                <span>Couleur</span>
                                                <FontAwesomeIcon icon={faChevronDown} />
                                                {(typeFilter === 'color') ? <FilterProducts category={category} typeFilter={'color'} setTypeFilter={setTypeFilter} filterActive={filterActive} setFilterActive={setFilterActive} colorFilter={colorFilter} setColorFilter={setColorFilter} /> : null}
                                            </li>
                                            </>
                                            : (category === 1) ?
                                            <>
                                            <li onMouseOver={() => {setTypeFilter('kind')}}>
                                                <span>Type</span>
                                                <FontAwesomeIcon icon={faChevronDown} />
                                                {(typeFilter === 'kind') ? <FilterProducts category={category} typeFilter={'kind'} setTypeFilter={setTypeFilter} filterActive={filterActive} setFilterActive={setFilterActive} kindFilter={kindFilter} setKindFilter={setKindFilter} /> : null}
                                            </li>
                                            <li onMouseOver={() => {setTypeFilter('material')}}>
                                                <span>Matériau</span>
                                                <FontAwesomeIcon icon={faChevronDown} />
                                                {(typeFilter === 'material') ? <FilterProducts category={category} typeFilter={'material'} setTypeFilter={setTypeFilter} filterActive={filterActive} setFilterActive={setFilterActive} materialFilter={materialFilter} setMaterialFilter={setMaterialFilter} /> : null}
                                            </li> 
                                            </>
                                            : (category === 2) ?
                                            <>
                                            <li onMouseOver={() => {setTypeFilter('kind')}}>
                                                <span>Type</span>
                                                <FontAwesomeIcon icon={faChevronDown} />
                                                {(typeFilter === 'kind') ? <FilterProducts category={category} typeFilter={'kind'} setTypeFilter={setTypeFilter} filterActive={filterActive} setFilterActive={setFilterActive} kindFilter={kindFilter} setKindFilter={setKindFilter} /> : null}
                                            </li>
                                            <li onMouseOver={() => {setTypeFilter('color')}}>
                                                <span>Couleur</span>
                                                <FontAwesomeIcon icon={faChevronDown} />
                                                {(typeFilter === 'color') ? <FilterProducts category={category} typeFilter={'color'} setTypeFilter={setTypeFilter} filterActive={filterActive} setFilterActive={setFilterActive} colorFilter={colorFilter} setColorFilter={setColorFilter} /> : null}
                                            </li> 
                                            </> : null }
                                        </ul>
                                    </div>
                                    <div className="scroll-products">
                                        <div className="previous-products" onClick={() => setIndexStart(0) + setIndexEnd(8)}>
                                            <FontAwesomeIcon icon={faChevronLeft} />
                                            <span>Produits précédents</span>
                                        </div>
                                        <div className="products-page-index">
                                            <div className="first-page" onClick={() => setIndexStart(0) + setIndexEnd(8)}></div>
                                            <div className="second-page" onClick={() => setIndexStart(8) + setIndexEnd(16)}></div>
                                        </div>
                                        <div className="next-products" onClick={() => setIndexStart(8) + setIndexEnd(16)}>
                                            <span>Produits suivants</span>
                                            <FontAwesomeIcon icon={faChevronRight} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="items-container">
                                {/* Affichage des produits = aucun filtre */}
                                {(category !== undefined && filterActive.price === false && filterActive.size === false && filterActive.color === false && filterActive.kind === false && filterActive.material === false) ? 
                                    products[category].filter((item, index) => index >= indexStart && index < indexEnd).map((key) => {
                                        
                                        return(
                                            <ProductContext.Provider value={{ displayDetail, setDisplayDetail }} key={key.productName}>
                                                <Item key={key.productId}
                                                saveBasket={saveBasket}
                                                getBasket={getBasket}
                                                addBasket={addBasket}
                                                cartLength={cartLength}
                                                setCartLength={setcartLength}
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
                                                productAlt={key.productAlt}
                                                isAdded={key.isAdded} />
                                            </ProductContext.Provider>
                                        )
                                    })
                                : 
                                /* Affichage des produits = au moins 1 filtre activé */
                                ((filterActive.price === true && filterActive.size === false && filterActive.color === false && filterActive.kind === false && filterActive.material === false) 
                                || (filterActive.price === false && filterActive.size === true && filterActive.color === false) 
                                || (filterActive.price === false && filterActive.size === false && filterActive.color === true) 
                                || (filterActive.price === false && filterActive.kind === true && filterActive.material === false)
                                || (filterActive.price === false && filterActive.kind === false && filterActive.material === true)) ?

                                // Filtrage des produits par opérations logiques
                                products[category].filter((product) => 

                                    // Filtrage par prix uniquement
                                (product.productNewPrice >= priceFilter.valueMin && product.productNewPrice <= priceFilter.valueMax) 

                                    // Filtrage par couleur uniquement
                                || (colorsChosen.current.includes(product.productColor)) 

                                    // Filtrage par taille uniquement
                                || (product.productSize === sizeFilter.size || product.productCorridor === sizeFilter.corridor || product.isBig === sizeFilter.isBig)

                                    // Filtrage par genre uniquement
                                || (product.productKind === kindFilter.kind)
                                
                                    // Filtrage par matériau uniquement
                                || (product.productMaterial === materialFilter.material)
                                ).map((key) => {

                                        return(
                                            <ProductContext.Provider value={{ displayDetail, setDisplayDetail }} key={key.productName}>
                                                <Item key={key.productId}
                                                saveBasket={saveBasket}
                                                getBasket={getBasket}
                                                addBasket={addBasket}
                                                cartLength={cartLength}
                                                setCartLength={setcartLength}
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
                                                productAlt={key.productAlt}
                                                isAdded={key.isAdded} />
                                            </ProductContext.Provider>
                                        )
                                    })
                                : 
                                /* Affichage des produits = 2 filtres activés */
                                // Filtres activés : prix et couleur
                                ((filterActive.price === true && filterActive.size === false && filterActive.color === true && filterActive.kind === false)

                                // Filtres activés : prix et taille
                                || (filterActive.price === true && filterActive.size === true && filterActive.color === false)

                                // Filtres activés : taille et couleur
                                || (filterActive.price === false && filterActive.size === true && filterActive.color === true)

                                // Filtres activés : prix et genre
                                || (filterActive.price === true && filterActive.kind === true && filterActive.material === false && filterActive.color === false)

                                // Filtres activés : genre et matériau
                                || (filterActive.price === false && filterActive.kind === true && filterActive.material === true)

                                // Filtres activés : prix et matériau
                                || (filterActive.price === true && filterActive.kind === false && filterActive.material === true)) ?

                                products[category].filter((product) => 

                                // Filtrage prix et couleur
                                ((product.productNewPrice >= priceFilter.valueMin && product.productNewPrice <= priceFilter.valueMax) 
                                && (colorsChosen.current.includes(product.productColor)))

                                // Filtrage prix et taille
                                || ((product.productNewPrice >= priceFilter.valueMin && product.productNewPrice <= priceFilter.valueMax) 
                                && (product.productSize === sizeFilter.size || product.productCorridor === sizeFilter.corridor ||        product.isBig === sizeFilter.isBig))

                                // Filtrage taille et couleur
                                || ((product.productSize === sizeFilter.size || product.productCorridor === sizeFilter.corridor || product.isBig === sizeFilter.isBig) 
                                && (colorsChosen.current.includes(product.productColor)))
                                
                                // Filtrage prix et genre
                                || ((product.productNewPrice >= priceFilter.valueMin && product.productNewPrice <= priceFilter.valueMax) 
                                && (product.productKind === kindFilter.kind))

                                // Filtrage genre et matériau
                                || ((product.productKind === kindFilter.kind) 
                                && (product.productMaterial === materialFilter.material))

                                // Filtrage prix et matériau
                                || ((product.productNewPrice >= priceFilter.valueMin && product.productNewPrice <= priceFilter.valueMax) 
                                && (product.productMaterial === materialFilter.material))
                                ).map((key) => {
                                        return(
                                            <ProductContext.Provider value={{ displayDetail, setDisplayDetail }} key={key.productName}>
                                                <Item key={key.productId}
                                                saveBasket={saveBasket}
                                                getBasket={getBasket}
                                                addBasket={addBasket}
                                                cartLength={cartLength}
                                                setCartLength={setcartLength}
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
                                                productAlt={key.productAlt}
                                                isAdded={key.isAdded} />
                                            </ProductContext.Provider>
                                        )
                                    }) 
                                : 
                                /* Affichage des produits = 3 filtres activés */
                                ((filterActive.price === true && filterActive.size === true && filterActive.color === true)
                                || (filterActive.price === true && filterActive.kind === true && filterActive.material === true)
                                || (filterActive.price === true && filterActive.kind === true && filterActive.color === true)) ?

                                products[category].filter((product) => 
                                // Filtrage prix + taille + couleur
                                ((product.productNewPrice >= priceFilter.valueMin && product.productNewPrice <= priceFilter.valueMax) 
                                && (product.productSize === sizeFilter.size || product.productCorridor === sizeFilter.corridor || product.isBig === sizeFilter.isBig)
                                && (colorsChosen.current.includes(product.productColor)))
                                                
                                // Filtrage prix + genre + matériau
                                || ((product.productNewPrice >= priceFilter.valueMin && product.productNewPrice <= priceFilter.valueMax) 
                                && (product.productKind === kindFilter.kind) 
                                && (product.productMaterial === materialFilter.material))

                                // Filtrage prix + genre + couleur
                                || ((product.productNewPrice >= priceFilter.valueMin && product.productNewPrice <= priceFilter.valueMax) 
                                && (product.productKind === kindFilter.kind) 
                                && (colorsChosen.current.includes(product.productColor)))
                                
                                ).map((key) => {
                                        return(
                                            <ProductContext.Provider value={{ displayDetail, setDisplayDetail }} key={key.productName}>
                                                <Item key={key.productId}
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
                                                productAlt={key.productAlt}
                                                isAdded={key.isAdded} />
                                            </ProductContext.Provider>
                                        )
                                }) : null
                                }
                            </div>
                        </div>
                    </section>
                    <Footer />
                </main>
            </div>
            { (displayDetail) ?
                <ProductContext.Provider value={{ displayDetail, setDisplayDetail }}>
                    <DetailedProduct products={products} 
                    categoryIndex={categoryIndex} 
                    cartLength={cartLength} 
                    setCartLength={setcartLength}
                    addBasket={addBasket} />
                </ProductContext.Provider> 
            : null }
        </div>
        </>
    );
};

export default Products;