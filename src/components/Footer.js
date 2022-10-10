import React from 'react';

const Footer = () => {
    return (
        <footer>
            <div className='footer-about'>
                <div className="title">
                    <h3>À PROPOS</h3>
                </div>
                <div className="links">
                    <p>Nos valeurs</p>
                    <p>Nos artisans</p>
                    <p>F.A.Q</p>
                    <p>Conditions Générales de Vente</p>
                </div>
            </div>
            <div className='footer-delivery'>
                <div className="title">
                    <h3>LIVRAISON</h3>
                </div>
                <div className="links">
                    <p>Suivre votre commande</p>
                    <p>Retours</p>
                    <p>Temps de livraison</p>
                </div>
            </div>
            <div className='footer-contact'>
            <div className="title">
                    <h3>CONTACT</h3>
                </div>
                <div className="links">
                    <p>Une question ? Besoin d'aide ?</p>
                    <p>Contactez-nous !</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;