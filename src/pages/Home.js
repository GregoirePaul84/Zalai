import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';

import Loader from './Loader';

import video from '../media/vidéo_de_Taryn_Elliott.mp4';
import mobileImg from '../media/Mobile/pexels-taryn-elliott-4502969.jpg';
import ZalaiLogo from '../components/ZalaiLogo';

const Home = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [innerWidth, setInnerWidth] = useState(window.innerWidth);

    function checkLoading() {     
        setIsLoading(false);    
    }

    useEffect(() => {
        if (isLoading === false) {
            const selectLoader = document.getElementById('loader-container');
            const selectContainer = document.querySelector('.main-loader');

            selectContainer.classList.add('move-right');
            selectLoader.style.animation = '1s ease-in-out 2s 1 normal forwards running loaderDisappears';
            setTimeout(() => {selectContainer.classList.add('loader-cancelled')}, 3500);  
        }
        console.log(isLoading);
        
    }, [isLoading]);

    const handleWidth = () => {
        setInnerWidth(window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener('resize', handleWidth, {
        });
    
        return () => {
            window.removeEventListener('resize', handleWidth);
        };

    });
    
    return (
        <>
            <div className="main-loader">
                <Loader isLoading={isLoading}/>
            </div>
            <div className="home-container">
                <div className="background">
                    {(innerWidth <= 480) ?
                        <img src={mobileImg} alt="" onLoad={() => checkLoading()}/>  
                    : 
                    <video 
                        className='home-video'
                        width="100%" 
                        height="100%" 
                        autoPlay muted loop 
                        onLoadedData={() => {
                            checkLoading();
                        }}>
                        <source src={video} type="video/mp4"/>
                    </video> }
                    <div className="gray-layout"></div>
                </div>
                <div className="foreground">
                    <header>
                        <NavBar checkPage={'home'}/>
                    </header>
                    <main className='brand-title-container'>
                        <section>
                            {(innerWidth <= 480) ?
                                <ZalaiLogo isLoading={isLoading} time={20}/>  
                            : 
                            <h1>Zalaï</h1>} 
                            <h2>Art berbère</h2>
                        </section>
                    </main>
                </div>   
            </div>
        </>
    );
};

export default Home;