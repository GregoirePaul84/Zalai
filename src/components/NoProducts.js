import React from 'react';

import border from '../media/border_big.png';

const NoProducts = () => {
    return (
        <div className="no-products-container">
             <div className="no-products-card">
                <div className="border-decoration">
                    <img src={border} alt="bordure décorative bleu foncé" />
                </div>
                <div className="no-products-content">
                    <div className="zalai-svg">
                        <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect y="127.799" width="180.735" height="12.9759" transform="rotate(-45 0 127.799)" fill="#4D64B5"/>
                            <path d="M31.5128 159.499L59.3992 131.612L68.5745 140.788L40.6881 168.674L31.5128 159.499Z" fill="#4D64B5"/>
                            <rect x="131.527" y="59.3962" width="39.4386" height="12.9759" transform="rotate(-45 131.527 59.3962)" fill="#4D64B5"/>
                            <rect x="40.6881" y="31.5128" width="39.4331" height="12.9759" transform="rotate(45 40.6881 31.5128)" fill="#4D64B5"/>
                            <rect x="139.861" y="130.685" width="40.0534" height="12.9759" transform="rotate(45 139.861 130.685)" fill="#4D64B5"/>
                            <rect x="63.0257" y="190.825" width="180.735" height="12.9759" transform="rotate(-45 63.0257 190.825)" fill="#4D64B5"/>
                            <rect x="9.17535" y="63.0256" width="180.735" height="12.9759" transform="rotate(45 9.17535 63.0256)" fill="#4D64B5"/>
                            <rect x="72.2009" y="3.8147e-06" width="180.735" height="12.9759" transform="rotate(45 72.2009 3.8147e-06)" fill="#4D64B5"/>
                            <path d="M91.8293 115V102.7C92.896 102.633 93.9293 102.5 94.9293 102.3C95.996 102.1 96.996 101.833 97.9293 101.5C99.0626 101.167 100.129 100.633 101.129 99.9C102.196 99.1 103.029 98.1 103.629 96.9C104.296 95.6333 104.629 94.1333 104.629 92.4V87.6C104.629 85.4 104.263 83.6 103.529 82.2C102.796 80.7333 101.496 80 99.6293 80C97.8293 80 96.596 80.6667 95.9293 82C95.2626 83.3333 94.9293 85.0667 94.9293 87.2V92.7H83.3293V85.9C83.3293 76.3667 88.796 71.6 99.7293 71.6C103.929 71.6 107.263 72.1333 109.729 73.2C112.196 74.2667 113.963 75.9667 115.029 78.3C116.096 80.5667 116.629 83.6333 116.629 87.5V90.2C116.629 93.1333 116.163 95.7333 115.229 98C114.296 100.267 113.029 102.1 111.429 103.5C109.829 104.9 107.929 105.8 105.729 106.2C105.129 106.333 104.529 106.433 103.929 106.5C103.329 106.5 102.663 106.5 101.929 106.5V115H91.8293ZM96.6293 131.8C94.9626 131.8 93.5626 131.267 92.4293 130.2C91.296 129.067 90.7293 127.733 90.7293 126.2C90.7293 124.6 91.296 123.233 92.4293 122.1C93.5626 120.967 94.9626 120.4 96.6293 120.4C98.296 120.4 99.7293 120.967 100.929 122.1C102.129 123.233 102.729 124.6 102.729 126.2C102.729 127.733 102.129 129.067 100.929 130.2C99.7293 131.267 98.296 131.8 96.6293 131.8Z" fill="#D9A569"/>
                        </svg>
                    </div>
                    <div className="product-line-container">
                        <div className="product-line"></div>
                    </div>
                    <div className="no-products-message">
                        <h2>Aucun produit trouvé</h2>
                        <p>Aucun produit ne correspond à votre souhait pour l'instant ...</p>
                        <p><span>Modifiez votre recherche</span> ou <span>revenez nous voir chaque mois</span> pour de nouveaux arrivages !</p>
                    </div>
                </div>
                
                <div className="border-bottom-container"></div>
            </div> 
        </div>
    );
};

export default NoProducts;