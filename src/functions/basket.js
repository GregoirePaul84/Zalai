export function saveBasket(basket) {
    localStorage.setItem('basket', JSON.stringify(basket));
} 

export function getBasket() {
    let basket = localStorage.getItem('basket');

    if (basket === null) 
        return [];
    else
        return JSON.parse(localStorage.getItem('basket'));
}

export function addBasket(product) {
    let basket = getBasket();
    basket.push(product);
    saveBasket(basket);
}