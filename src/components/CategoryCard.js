import React from 'react';


const CategoryCard = ({categoryChosen, categoryName, categoryImg, categoryAlt, categoryClass}) => {


    function productsAppear() {

        const selectProductsContainer = document.querySelector('.products-container');
        const selectMain = document.getElementsByTagName('main');
        const selectProductsList = document.querySelector('.products-list');
        const selectItemsContainer = document.querySelector('.items-container');
        const selectSectionProducts = document.querySelector('.products-list-container');
        const selectBorder = document.querySelector('.products-border');
        
        selectProductsContainer.style.height = 'auto';
        selectMain[0].style.height = 'auto';
        selectProductsList.style.minHeight = '900px';
        selectItemsContainer.style.display = 'flex';

        if(categoryName === 'Tapis') {
            categoryChosen('tapis');
            selectSectionProducts.style.backgroundColor = 'white';
            selectBorder.style.opacity = '1';
            const selectProductsContainer = document.querySelector('.products-list');
            selectProductsContainer.style.animation = '1s ease-in-out 0s 1 normal forwards running opacityProductCard';
            document.querySelector('.category-title').textContent = `Tapis berbères`;
        }

        if(categoryName === 'Luminaires') {
            categoryChosen('luminaires');
            selectSectionProducts.style.backgroundColor = 'white';
            selectBorder.style.opacity = '1';
            const selectProductsContainer = document.querySelector('.products-list');
            selectProductsContainer.style.animation = '1s ease-in-out 0s 1 normal forwards running opacityProductCard';
            document.querySelector('.category-title').textContent = `Luminaires`;
        }

        if(categoryName === 'Décorations') {
            categoryChosen('décorations');
            selectSectionProducts.style.backgroundColor = 'white';
            selectBorder.style.opacity = '1';
            const selectProductsContainer = document.querySelector('.products-list');
            selectProductsContainer.style.animation = '1s ease-in-out 0s 1 normal forwards running opacityProductCard';
            document.querySelector('.category-title').textContent = `Décorations`;
        }
    }


    return (
        <article className={categoryClass} onClick={productsAppear}>
            <img src={categoryImg} alt={categoryAlt} />
            <h3>{categoryName}</h3>
           
        </article>
    )  
};

export default CategoryCard;