import React from 'react';

const Footer = () => {
    return (
        <footer>
            <div className="border-container"></div>
            <div className="footer-links">
                <div className='footer-about'>
                    <div className="title">
                        <h3>À PROPOS</h3>
                    </div>
                    <ul className="links">
                        <li>
                            <span>ⵖ</span>
                            Nos valeurs
                        </li>
                        <li>
                            <span>ⴰ</span>
                            Nos artisans
                        </li>
                        <li>
                            <span>ⴼ</span>
                            F.A.Q
                        </li>
                        <li>
                            <span>ⵛ</span>
                            Conditions Générales de Vente
                        </li>
                    </ul>
                </div>
                <div className='footer-delivery'>
                    <div className="title">
                        <h3>LIVRAISON</h3>
                    </div>
                    <ul className="links">
                        <li>
                            <span>ⵙ</span>
                            Suivre votre commande
                        </li>
                        <li>
                            <span>ⵔ</span>
                            Retours
                        </li>
                        <li>
                            <span>ⵜ</span>
                            Temps de livraison
                        </li>
                    </ul>
                </div>
                <div className='footer-contact'>
                <div className="title">
                        <h3>CONTACT</h3>
                    </div>
                    <ul className="links">
                        <li>
                            <span>ⵛ</span>
                            Une question ? Besoin d'aide ?
                            {/* <br /> */}
                            {/* <span></span> */}
                            <p>Contactez-nous !</p>
                            
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;