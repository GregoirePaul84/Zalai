import React, { useEffect, useState } from 'react';

const FilterProducts = ({setTypeFilter, filterActive, setFilterActive, typeFilter, priceFilter, setPriceFilter, sizeFilter, setSizeFilter, colorFilter, setColorFilter}) => {
   
    function hideFilter() {
        setTypeFilter(undefined);
    }

    // ====== LOGIQUE FILTRE PRIX ====== //

    // Stockage du prix dans le session storage et ajout du backgroundColor lors de la sélection

    useEffect(() => {
        if (typeFilter !== 'price') return; 

        sessionStorage.setItem('price', JSON.stringify(priceFilter));
        
        const priceStorage = JSON.parse(sessionStorage.getItem('price'));

        const selectedPrice = document.querySelector(`.${priceStorage.name}`);
        const otherPrices = document.querySelectorAll(`#ul-price > li:not(.${priceStorage.name})`);

        if(priceStorage.name !== undefined) {
            selectedPrice.style.backgroundColor = "#D9A569";
            otherPrices.forEach(li => li.style.backgroundColor = 'inherit');
            setFilterActive({price: true, size: filterActive.size, color: filterActive.color});
        }
        else {
            setFilterActive({price: false, size: filterActive.size, color: filterActive.color}); 
        }
    }, [priceFilter]);


    // ====== LOGIQUE FILTRE TAILLES ====== //

    useEffect(() => {
        if (typeFilter !== 'size') return; 
        console.log(filterActive);

        sessionStorage.setItem('size', JSON.stringify(sizeFilter));
        
        const sizeStorage = JSON.parse(sessionStorage.getItem('size'));

        const selectedSize = document.querySelector(`.${sizeStorage.name}`);
        const otherSizes = document.querySelectorAll(`#ul-size > li:not(.${sizeStorage.name})`);

        if(sizeStorage.name !== undefined) {
            selectedSize.style.backgroundColor = "#D9A569";
            otherSizes.forEach(li => li.style.backgroundColor = 'inherit');
            setFilterActive({price: filterActive.price, size: true, color: filterActive.color});
        }
        else {
            setFilterActive({price: filterActive.price, size: false, color: filterActive.color}); 
        }
    }, [sizeFilter]);

    // ====== LOGIQUE FILTRE COULEURS ====== //

    // Mise à jour du state colorFilter selon la couleur

    function setColor(e) {
        const findColorIndex = colorFilter.findIndex(index => index.id === e.target.id);
        
        switch (e.target.id) {
            case 'white':
                setColorFilter([{'id': 'white', 'isChecked': !colorFilter[findColorIndex].isChecked}, ...colorFilter.filter(obj => obj.id !== 'white')]);
                break;

            case 'black':
                setColorFilter([{'id': 'black', 'isChecked': !colorFilter[findColorIndex].isChecked}, ...colorFilter.filter(obj => obj.id !== 'black')]);
                break;

            case 'gray':
                setColorFilter([{'id': 'gray', 'isChecked': !colorFilter[findColorIndex].isChecked}, ...colorFilter.filter(obj => obj.id !== 'gray')]);
                break;
    
            case 'green':
                setColorFilter([{'id': 'green', 'isChecked': !colorFilter[findColorIndex].isChecked}, ...colorFilter.filter(obj => obj.id !== 'green')]);
                break

            case 'red':
                setColorFilter([{'id': 'red', 'isChecked': !colorFilter[findColorIndex].isChecked}, ...colorFilter.filter(obj => obj.id !== 'red')]);
                break;
        
            case 'orange':
                setColorFilter([{'id': 'orange', 'isChecked': !colorFilter[findColorIndex].isChecked}, ...colorFilter.filter(obj => obj.id !== 'orange')]);
                break

            case 'yellow':
                setColorFilter([{'id': 'yellow', 'isChecked': !colorFilter[findColorIndex].isChecked}, ...colorFilter.filter(obj => obj.id !== 'yellow')]);
                break
            
            case 'blue':
                setColorFilter([{'id': 'blue', 'isChecked': !colorFilter[findColorIndex].isChecked}, ...colorFilter.filter(obj => obj.id !== 'blue')]);
                break
                
            case 'purple':
                setColorFilter([{'id': 'purple', 'isChecked': !colorFilter[findColorIndex].isChecked}, ...colorFilter.filter(obj => obj.id !== 'purple')]);
                break;
            
            case 'maroon':
                setColorFilter([{'id': 'maroon', 'isChecked': !colorFilter[findColorIndex].isChecked}, ...colorFilter.filter(obj => obj.id !== 'maroon')]);
                break
            
            default:
              console.log('couleur non disponible');
        }
    }

    // Stockage du / des couleurs dans le session storage + gestion de la coche des inputs

    useEffect(() => {
        if (typeFilter !== 'color') return; 
        
        sessionStorage.setItem('color', JSON.stringify(colorFilter));
        
        const colorStorage = JSON.parse(sessionStorage.getItem('color'));
        
        const chosenColors = colorStorage.filter(clrs => clrs.isChecked === true);

        const allColors = document.querySelectorAll(`#ul-color input`);
        allColors.forEach(elt => elt.style.opacity = '0');

        if(chosenColors.length === 0) {
            setFilterActive({price: filterActive.price, size: filterActive.size, color: false});
            return;
        }
        else {
            setFilterActive({price: filterActive.price, size: filterActive.size, color: true});

            for (let i in chosenColors) {
                const selectedColor = document.querySelector(`#ul-color #${chosenColors[i].id}`);
                
                selectedColor.checked = true;
                selectedColor.style.opacity = '1';      
            }
        }  
    }, [colorFilter]);

    // Filtre de prix

    if (typeFilter === 'price') {
        return (
            <div className={`filter-choices-container price`} onMouseOut={hideFilter}>
                <div className="filter-choices">
                    <ul id='ul-price'>
                        <li className='price200' onClick={() => setPriceFilter({valueMin: 0, valueMax: 200, name: "price200"})}>
                            <label htmlFor='price1'>0€ à 200€</label>
                            <input type="radio" name='price' id='price1'/>
                        </li>
                        <li className='price300' onClick={() => setPriceFilter({valueMin: 200, valueMax: 300, name: "price300"})}>
                            <label htmlFor='price2'>200€ à 300€</label>
                            <input type="radio" name='price' id='price2' />
                        </li>
                        <li className='price400' onClick={() => setPriceFilter({valueMin: 300, valueMax: 400, name: "price400"})}>
                            <label htmlFor='price3'>300€ à 400€</label>
                            <input type="radio" name='price' id='price3' />
                        </li>
                        <li className='price500' onClick={() => setPriceFilter({valueMin: 400, valueMax: 500, name: "price500"})}>
                            <label htmlFor='price4'>400€ à 500€</label>
                            <input type="radio" name='price' id='price4'/>
                        </li>
                        <li className='price999' onClick={() => setPriceFilter({valueMin: 500, valueMax: 999, name: "price999"})}>
                            <label htmlFor='price5'>Plus de 500€</label>
                            <input type="radio" name='price' id='price5'/>
                        </li>
                    </ul>   
                </div>  
            </div>
        )
    };

    
    // Filtre de tailles

    if (typeFilter === 'size') {
        return (
            <div className={`filter-choices-container size`} onMouseOut={hideFilter}>
                <div className="filter-choices">
                    <ul id='ul-size'>
                        <li className='size90' onClick={() => setSizeFilter({size: '60 x 90', name: "size90"})}>
                            <label htmlFor='size1'>60 x 90</label>
                            <input type="radio" name='size' id='size1'/>
                        </li>
                        <li className='size170' onClick={() => setSizeFilter({size: '120 x 170', name: "size170"})}>
                            <label htmlFor='size2'>120 x 170</label>
                            <input type="radio" name='size' id='size2' />
                        </li>
                        <li className='size270' onClick={() => setSizeFilter({size: '180 x 270', name: "size270"})}>
                            <label htmlFor='size3'>180 x 270</label>
                            <input type="radio" name='size' id='size3' />
                        </li>
                        <li className='size350' onClick={() => setSizeFilter({size: '250 x 350', name: "size350"})}>
                            <label htmlFor='size4'>250 x 350</label>
                            <input type="radio" name='size' id='size4'/>
                        </li>
                        <li className='size351' onClick={() => setSizeFilter({isBig: true, name: "size351"})}>
                            <label htmlFor='size5'>Plus de 250 x 350</label>
                            <input type="radio" name='size' id='size5'/>
                        </li>
                        <li className='size352' onClick={() => setSizeFilter({corridor: true, name: "size352"})}>
                            <label htmlFor='size6'>Couloir</label>
                            <input type="radio" name='size' id='size6'/>
                        </li>
                    </ul>   
                </div>  
            </div>
        )
    };

    // Filtre de couleurs

    if (typeFilter === 'color') {
        return (
            <div className={`filter-choices-container color`} onMouseOut={hideFilter}>
                <div className="filter-choices">
                    <ul id='ul-color'>
                        <li>
                            <div className="color-container1">
                                <input type="checkbox" id='white' title='blanc' onClick={(e) => setColor(e)} />
                            </div>  
                            <p>Blanc</p>
                        </li>
                        <li>
                            <div className="color-container2">
                                <input type="checkbox" id='black' title='noir' onClick={(e) => setColor(e)}/>
                            </div>
                            <p>Noir</p>
                        </li>
                        <li >
                            <div className="color-container3">  
                                <input type="checkbox" id='gray' title='gris' onClick={(e) => setColor(e)}/>
                            </div>
                            <p>Gris</p>
                        </li>
                        <li >
                            <div className="color-container4">  
                                <input type="checkbox" id='green' title='vert' onClick={(e) => setColor(e)}/>
                            </div>
                            <p>Vert</p>
                        </li>
                        <li >
                            <div className="color-container5">  
                                <input type="checkbox" id='red' title='rouge' onClick={(e) => setColor(e)}/>
                            </div>
                            <p>Rouge</p>
                        </li>
                        <li >
                            <div className="color-container6">  
                                <input type="checkbox" id='orange' title='orange' onClick={(e) => setColor(e)}/>
                            </div>
                            <p>Orange</p>
                        </li>
                        <li >
                            <div className="color-container7">  
                                <input type="checkbox" id='yellow' title='jaune' onClick={(e) => setColor(e)}/>
                            </div>
                            <p>Jaune</p>
                        </li>
                        <li >
                            <div className="color-container8">  
                                <input type="checkbox" id='blue' title='bleu' onClick={(e) => setColor(e)}/>
                            </div>
                            <p>Bleu</p>
                        </li>
                        <li >
                            <div className="color-container9">  
                                <input type="checkbox" id='purple' title='violet' onClick={(e) => setColor(e)}/>
                            </div>
                            <p>Violet</p>
                        </li>
                        <li >
                            <div className="color-container10">  
                                <input type="checkbox" id='maroon' title='marron' onClick={(e) => setColor(e)}/>
                            </div>
                            <p>Marron</p>
                        </li>
                    </ul>   
                </div>  
            </div>
        )
    };

    
};

export default FilterProducts;