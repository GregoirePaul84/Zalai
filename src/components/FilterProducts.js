import React, { useEffect, useState } from 'react';

const colorsArray = [{'id': 'white', 'isChecked': false}, {'id': 'black', 'isChecked': false}, {'id': 'gray', 'isChecked': false}, {'id': 'green', 'isChecked': false}, {'id': 'red', 'isChecked': false}, {'id': 'orange', 'isChecked': false}, {'id': 'yellow', 'isChecked': false}, {'id': 'blue', 'isChecked': false}, {'id': 'purple', 'isChecked': false}, {'id': 'maroon', 'isChecked': false}];

const FilterProducts = (props) => {

    const [widthValue, setWidthValue] = useState(0);
    const [lengthValue, setLengthValue] = useState(0);
    const [colorChecked, setColorChecked] = useState(colorsArray);

    useEffect(() => {
        console.log(colorChecked);

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
        
    }, [colorChecked])

    if (props.typeFilter === 'price') {
        return (
            <div className={`filter-choices-container ${props.typeFilter}`}>
                <div className="filter-choices">
    
                    <h4>Filtrer par prix</h4>
                    <ul>
                        <li>
                            <span>100€ à 150€</span>
                            <input type="radio" name='price'/>
                        </li>
                        <li>
                            <span>150€ à 200€</span>
                            <input type="radio" name='price'/>
                        </li>
                        <li>
                        <span>200€ à 250€</span>
                            <input type="radio" name='price'/>
                        </li>
                        <li>
                            <span>250€ à 350€</span>
                            <input type="radio" name='price'/>
                        </li>
                        <li>
                            <span>Plus de 350€</span>
                            <input type="radio" name='price'/>
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
            <div className={`filter-choices-container ${props.typeFilter}`}>
                <div className="filter-choices">
    
                    <h4>Filtrer par tailles</h4>
                    <ul>
                        <li>
                        <input type="range" name="width"
                                min="0" max="200" value={widthValue} onChange={(e) => {displayWidthAmount(e)}}/>
                        <label for="largeur">Largeur (cm)</label>
                        </li>
                        <li>
                            <input type="number" name="width"
                                    min="0" max="200" value={widthValue} onChange={(e) => {displayWidthAmount(e)}}/>
                        </li>
                        <li>
                        <input type="range" name="length"
                                min="0" max="500" value={lengthValue} onChange={(e) => {displayLengthAmount(e)}}/>
                        <label for="longueur">Longueur (cm)</label>
                        </li>
                        <li>
                            <input type="number" name="length"
                                    min="0" max="500" value={lengthValue} onChange={(e) => {displayLengthAmount(e)}}/>
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
            <div className={`filter-choices-container ${props.typeFilter}`}>
                <div className="filter-choices">
    
                    <h4>Filtrer par couleurs</h4>
                    <ul>
                        <li onClick={(e) => setColor(e)}>
                            <input type="checkbox" id='white'/>
                        </li>
                        <li onClick={(e) => setColor(e)}>
                            <input type="checkbox" id='black'/>
                        </li>
                        <li onClick={(e) => setColor(e)}>
                            <input type="checkbox" id='gray'/>
                        </li>
                        <li onClick={(e) => setColor(e)}>
                            <input type="checkbox" id='green'/>
                        </li>
                        <li onClick={(e) => setColor(e)}>
                            <input type="checkbox" id='red'/>
                        </li>
                        <li onClick={(e) => setColor(e)}>
                            <input type="checkbox" id='orange'/>
                        </li>
                        <li onClick={(e) => setColor(e)}>
                            <input type="checkbox" id='yellow'/>
                        </li>
                        <li onClick={(e) => setColor(e)}>
                            <input type="checkbox" id='blue'/>
                        </li>
                        <li onClick={(e) => setColor(e)}>
                            <input type="checkbox" id='purple'/>
                        </li>
                        <li onClick={(e) => setColor(e)}>
                            <input type="checkbox" id='maroon'/>
                        </li>
                    </ul>   
                </div>  
            </div>
        )
    };

    
};

export default FilterProducts;