import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';

import video from '../media/vidéo_de_Taryn_Elliott.mp4';
import Loader from './Loader';

const Home = () => {

    const [isLoading, setIsLoading] = useState(true);

    function checkLoading() {
        setIsLoading(false);
        console.log(isLoading);
    }

    useEffect(() => {
        if (isLoading === false) {
            const selectLoader = document.getElementById('loader-container');
            const selectContainer = document.querySelector('.home-loader');

            setTimeout(() => {selectLoader.style.animation = '1s ease-in-out 1s 1 normal forwards running loaderDisappears'}, 2300);
            setTimeout(() => {selectContainer.classList.add('loader-cancelled')}, 4300);  
        }
        console.log(isLoading);
        
    }, [isLoading])

    return (
        <>
            <div className="home-loader">
                <Loader />
            </div>
            <div className="home-container">
                <div className="background">
                    <video 
                    className='home-video'
                    width="100%" 
                    height="100%" 
                    autoPlay muted loop 
                    onLoadedData={() => {
                        checkLoading();
                    }}>
                        <source src={video} type="video/mp4"/>
                    </video>
                    <div className="gray-layout"></div>
                </div>
                <div className="foreground">
                    <header>
                        <NavBar />
                    </header>
                    <main className='brand-title-container'>
                        <section>
                            <h1>Zalaï</h1>
                            <h2>Art berbère</h2>
                        </section>
                    </main>
                </div>   
            </div>
        </>
    );
};

export default Home;