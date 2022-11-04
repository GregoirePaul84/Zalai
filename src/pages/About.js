import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

import aboutImg from '../media/houmt-souk-6599499_1920.jpg';

const About = () => {

    const [scrollY, setScrollY] = useState(0);
    const [brightness, setBrightness] = useState(0.4);

    const handleScroll = () => {
        setScrollY(window.scrollY);
    }

    useEffect(() => {
        if (scrollY >= 300) {
            document.querySelector('.values').style.animation = '1s ease-out 0s 1 normal forwards running moveAboutCard2';
        }
        
        if (scrollY >= 500 && scrollY < 600) {
            setBrightness(1);
        }

        if (scrollY >= 600) {
            document.querySelector('.products').style.animation = '1s ease-out 0s 1 normal forwards running moveAboutCard1';
            setBrightness(1);
            return;
        }
        else {
            setBrightness(scrollY / 1000 + 0.4);
        }
        console.log(scrollY);  
        
    }, [scrollY, brightness])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, {
        });
    
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };

    });

    return (
        <>
            {/* <div className="home-loader">
                    <Loader />
            </div> */}
            <div className='about-container'>
                <div className="background">
                    <img src={aboutImg} alt="Désert du Sahara" style={{filter: `brightness(${brightness})`}}/>
                    <div className="gray-layout" style={{backgroundColor: `rgba(58, 58, 58, 0.7})`}}></div>
                </div>
                <div className="foreground">
                    <Header checkPage={'about'} />
                    <main className='about-main'> 
                        <article className="about-card company">
                            <div className="card-title">
                                <h2>L'entreprise <span>Zalaï</span></h2>
                            </div>
                            <div className="card-content">
                                <ul>
                                    <li>La société Zalaï est le fruit d’une passion pour l’art d’intérieur berbère.</li>
                                    <li>Nous sommes une entreprise familiale franco-marocaine, parcourant l’Atlas afin de vous trouver les meilleurs produits, au meilleur prix. </li>
                                    <li></li>
                                </ul>
                            </div>
                        </article>
                        <article className="about-card values">
                            <div className="card-title">
                                <h2>Les valeurs <span>Zalaï</span></h2>
                            </div>
                            <div className="card-content">
                                <ul>
                                    <li>
                                        <h4>Commerce équitable :</h4> 
                                        Une rémunération équitable pour tous nos artisans.
                                    </li>
                                    <li>
                                        <h4>Artisanat :</h4>
                                        Privilégier le qualitatif au quantitatif.
                                    </li>
                                    <li>
                                        <h4>Des prix raisonnables :</h4>
                                    Parce que se sentir bien chez soi ne doit pas être une question de budget.
                                    </li>
                                </ul>
                            </div>
                        </article>
                        <article className="about-card products">
                            <div className="card-title">
                                <h2>Les produits <span>Zalaï</span></h2>
                            </div>
                            <div className="card-content">
                                <ul>
                                    <li>
                                        <h4>Uniques :</h4>
                                        Confectionné à la main, votre produit sera unique au monde.
                                    </li>
                                    <li>
                                        <h4>Résistants :</h4>
                                        Issus des meilleurs matériaux, nos produits vous accompagnerons pendant de longues années !
                                    </li>
                                    <li>
                                        <h4>Sélectionnés :</h4>
                                        Nous sélectionnons nos produits comme si votre salon était le notre.
                                    </li>
                                </ul>
                            </div>
                        </article>
                    </main>
                    <Footer />
                </div>
            </div>
        </>
    );
};

export default About;