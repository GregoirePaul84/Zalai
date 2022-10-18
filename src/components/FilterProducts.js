import React, { useEffect, useState } from 'react';

const colorsArray = [{'id': 'white', 'isChecked': false}, {'id': 'black', 'isChecked': false}, {'id': 'gray', 'isChecked': false}, {'id': 'green', 'isChecked': false}, {'id': 'red', 'isChecked': false}, {'id': 'orange', 'isChecked': false}, {'id': 'yellow', 'isChecked': false}, {'id': 'blue', 'isChecked': false}, {'id': 'purple', 'isChecked': false}, {'id': 'maroon', 'isChecked': false}];

const FilterProducts = (props) => {

    const [widthValue, setWidthValue] = useState(0);
    const [lengthValue, setLengthValue] = useState(0);
    const [colorChecked, setColorChecked] = useState(colorsArray);

    const setTypeFilter = props.setTypeFilter;

    useEffect(() => {
        const detectFilterColor = document.querySelector('.filter-choices-container');

        if (detectFilterColor.classList.contains('color')) {
            for (let i in colorChecked) {
            
                if(colorChecked[i].isChecked) {
                    document.getElementById(colorChecked[i].id).checked = true;
                    document.getElementById(colorChecked[i].id).style.opacity = '1';
                }
                    
                else {
                    document.getElementById(colorChecked[i].id).checked = false;
                    document.getElementById(colorChecked[i].id).style.opacity = '0';
                }
                    
            }
        }

        else {
            return;
        }

    }, [colorChecked])

    function removeFilter() {
        setTypeFilter(undefined);
    }

    if (props.typeFilter === 'price') {
        return (
            <div className={`filter-choices-container ${props.typeFilter}`} onMouseOut={removeFilter}>
                <div className="filter-choices">
                    <ul>
                        <li>
                            <label htmlFor='price1'>100€ à 150€</label>
                            <input type="radio" name='price' id='price1'/>
                        </li>
                        <li>
                            <label htmlFor='price2'>150€ à 200€</label>
                            <input type="radio" name='price' id='price2'/>
                        </li>
                        <li>
                            <label htmlFor='price3'>200€ à 250€</label>
                            <input type="radio" name='price' id='price3'/>
                        </li>
                        <li>
                            <label htmlFor='price4'>250€ à 350€</label>
                            <input type="radio" name='price' id='price4'/>
                        </li>
                        <li>
                            <label htmlFor='price5'>Plus de 350€</label>
                            <input type="radio" name='price' id='price5'/>
                        </li>
                        </ul>   
                </div>  
            </div>
        )
    };

    function displayWidthAmount(e) {
        setWidthValue(e.target.value);
    }

    function displayLengthAmount(e) {
        setLengthValue(e.target.value);
    }


    if (props.typeFilter === 'size') {
        return (
            <div className={`filter-choices-container ${props.typeFilter}`} onMouseOut={removeFilter}>
                <div className="filter-choices">
                    <ul>
                        <li>
                            <input type="range" name="width" min="0" max="200" value={widthValue} onChange={(e) => {displayWidthAmount(e)}}/>
                            <label htmlFor="largeur">Largeur (cm)</label>
                        </li>
                        <li>
                            <input type="number" name="width" min="0" max="200" className='input-number' value={widthValue} onChange={(e) => {displayWidthAmount(e)}}/>
                        </li>
                        <li>
                            <input type="range" name="length" min="0" max="500" value={lengthValue} onChange={(e) => {displayLengthAmount(e)}}/>
                            <label htmlFor="longueur">Longueur (cm)</label>
                        </li>
                        <li>
                            <input type="number" name="length" min="0" max="500" className='input-number' value={lengthValue} onChange={(e) => {displayLengthAmount(e)}}/>
                        </li>
                    </ul>   
                </div>  
            </div>
        )
    };

    function setColor(e) {
        const findColorIndex = colorChecked.findIndex(index => index.id === e.target.id);
        console.log(e.target.id);
        console.log(findColorIndex);

        switch (e.target.id) {
            case 'white':
                setColorChecked([{'id': 'white', 'isChecked': !colorChecked[findColorIndex].isChecked}, ...colorChecked.filter(obj => obj.id !== 'white')]);
                break;

            case 'black':
                setColorChecked([{'id': 'black', 'isChecked': !colorChecked[findColorIndex].isChecked}, ...colorChecked.filter(obj => obj.id !== 'black')]);
                break;

            case 'gray':
                setColorChecked([{'id': 'gray', 'isChecked': !colorChecked[findColorIndex].isChecked}, ...colorChecked.filter(obj => obj.id !== 'gray')]);
                break;
    
            case 'green':
                setColorChecked([{'id': 'green', 'isChecked': !colorChecked[findColorIndex].isChecked}, ...colorChecked.filter(obj => obj.id !== 'green')]);
                break

            case 'red':
                setColorChecked([{'id': 'red', 'isChecked': !colorChecked[findColorIndex].isChecked}, ...colorChecked.filter(obj => obj.id !== 'red')]);
                break;
        
            case 'orange':
                setColorChecked([{'id': 'orange', 'isChecked': !colorChecked[findColorIndex].isChecked}, ...colorChecked.filter(obj => obj.id !== 'orange')]);
                break

            case 'yellow':
                setColorChecked([{'id': 'yellow', 'isChecked': !colorChecked[findColorIndex].isChecked}, ...colorChecked.filter(obj => obj.id !== 'yellow')]);
                break
            
            case 'blue':
                setColorChecked([{'id': 'blue', 'isChecked': !colorChecked[findColorIndex].isChecked}, ...colorChecked.filter(obj => obj.id !== 'blue')]);
                break
                
            case 'purple':
                setColorChecked([{'id': 'purple', 'isChecked': !colorChecked[findColorIndex].isChecked}, ...colorChecked.filter(obj => obj.id !== 'purple')]);
                break;
            
            case 'maroon':
                setColorChecked([{'id': 'maroon', 'isChecked': !colorChecked[findColorIndex].isChecked}, ...colorChecked.filter(obj => obj.id !== 'maroon')]);
                break
            
            default:
              console.log('couleur non disponible');
        }
    }

    if (props.typeFilter === 'color') {
        return (
            <div className={`filter-choices-container ${props.typeFilter}`} onMouseOut={removeFilter}>
                <div className="filter-choices">
                    <ul id='color-window'>
                        <li onClick={(e) => setColor(e)}>
                            <div className="color-container1">
                                <input type="checkbox" id='white' title='blanc'/>
                            </div>  
                            <p>Blanc</p>
                        </li>
                        <li onClick={(e) => setColor(e)}>
                            <div className="color-container2">
                                <input type="checkbox" id='black' title='noir'/>
                            </div>
                            <p>Noir</p>
                        </li>
                        <li onClick={(e) => setColor(e)}>
                            <div className="color-container3">  
                                <input type="checkbox" id='gray' title='gris'/>
                            </div>
                            <p>Gris</p>
                        </li>
                        <li onClick={(e) => setColor(e)}>
                            <div className="color-container4">  
                                <input type="checkbox" id='green' title='vert'/>
                            </div>
                            <p>Vert</p>
                        </li>
                        <li onClick={(e) => setColor(e)}>
                            <div className="color-container5">  
                                <input type="checkbox" id='red' title='rouge'/>
                            </div>
                            <p>Rouge</p>
                        </li>
                        <li onClick={(e) => setColor(e)}>
                            <div className="color-container6">  
                                <input type="checkbox" id='orange' title='orange'/>
                            </div>
                            <p>Orange</p>
                        </li>
                        <li onClick={(e) => setColor(e)}>
                            <div className="color-container7">  
                                <input type="checkbox" id='yellow' title='jaune'/>
                            </div>
                            <p>Jaune</p>
                        </li>
                        <li onClick={(e) => setColor(e)}>
                            <div className="color-container8">  
                                <input type="checkbox" id='blue' title='bleu'/>
                            </div>
                            <p>Bleu</p>
                        </li>
                        <li onClick={(e) => setColor(e)}>
                            <div className="color-container9">  
                                <input type="checkbox" id='purple' title='violet'/>
                            </div>
                            <p>Violet</p>
                        </li>
                        <li onClick={(e) => setColor(e)}>
                            <div className="color-container10">  
                                <input type="checkbox" id='maroon' title='marron'/>
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