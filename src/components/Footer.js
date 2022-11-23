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
                            <p>Nos valeurs</p>
                        </li>
                        <li>
                            <span>ⴰ</span>
                            <p>Nos artisans</p>    
                        </li>
                        <li>
                            <span>ⴼ</span>
                            <p>F.A.Q</p>    
                        </li>
                        <li>
                            <span>ⵛ</span>
                            <p>Conditions Générales de Vente</p>
                            
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
                            <p>Suivre votre commande</p>     
                        </li>
                        <li>
                            <span>ⵔ</span>
                            <p>Retours</p>        
                        </li>
                        <li>
                            <span>ⵜ</span>
                            <p>Temps de livraison</p>      
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
                            <p>Une question ? Besoin d'aide ?<br />Contactez-nous !</p>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;