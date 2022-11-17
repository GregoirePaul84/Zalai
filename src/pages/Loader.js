import React, { useEffect } from 'react';

const Loader = () => {

    useEffect(() => {
        const selectContainer = document.querySelector('.main-loader');

        const selectFirstDraw = document.querySelector('.first-draw');
        const selectFirstOpacity = document.querySelector('.opacity-bar3');

        const selectFirstDraw2 = document.querySelector('.first-draw2');
        const selectFirstOpacity2 = document.querySelector('.opacity-bar4');

        const selectSecondDraw = document.querySelector('.second-draw');
        const selectSecondOpacity = document.querySelector('.opacity-bar1');

        const selectSecondDraw2 = document.querySelector('.second-draw2');
        const selectSecondOpacity2 = document.querySelector('.opacity-bar2');

        const selectThirdOpacity = document.querySelectorAll('.third-opacity');

        function playAnimation() {

            if (selectContainer.classList.contains('move-right')) {
                clearInterval(interval);
                return;
            }

            selectFirstDraw.style.animation = '0.3s linear 0.4s 1 normal forwards running moveLoaderBar45';
            selectFirstOpacity.style.animation = '0.5s linear 0.4s 1 normal forwards running barAppears';

            selectFirstDraw2.style.animation = '0.3s linear 0.6s 1 normal forwards running moveLoaderBar45-2';
            selectFirstOpacity2.style.animation = '0.5s linear 0.6s 1 normal forwards running barAppears';

            selectSecondDraw.style.animation = '0.3s linear 0s 1 normal forwards running moveLoaderBar45-3';
            selectSecondOpacity.style.animation = '0.5s linear 0s 1 normal forwards running barAppears';

            selectSecondDraw2.style.animation = '0.3s linear 0.2s 1 normal forwards running moveLoaderBar45-4';
            selectSecondOpacity2.style.animation = '0.5s linear 0.2s 1 normal forwards running barAppears';

            selectThirdOpacity.forEach((e) => {e.style.animation = '1s linear 0.8s 1 normal forwards running thirdOpacity'});
        }

        function replayAnimation() {
           
            selectFirstDraw.style.animation = 'none';
            selectFirstOpacity.style.animation = 'none';
            
            selectFirstDraw2.style.animation = 'none';
            selectFirstOpacity2.style.animation = 'none';

            selectSecondDraw.style.animation = 'none';
            selectSecondOpacity.style.animation = 'none';

            selectSecondDraw2.style.animation = 'none';
            selectSecondOpacity2.style.animation = 'none';
            selectThirdOpacity.forEach((e) => {e.style.animation = 'none'}); 
            
            setTimeout(() => {playAnimation()}, 50);
        }

        playAnimation();

        let interval = setInterval(replayAnimation, 3000)

    }, [])

    return (
        <div id="loader-container">
            <svg width="216" height="216" viewBox="0 0 216 216" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="216" height="216" fill="#D9A569"/>
                <rect y="137.886" width="195" height="14" transform="rotate(-45 0 137.886)" fill="white" className='opacity-bar3'/>
                <rect x="-3" y="133.886" width="200" height="19" transform="rotate(-45 0 137.886)" fill="#D9A569" className='first-draw' />
                <rect x="34" y="171.781" width="42.55" height="14" transform="rotate(-45 34 171.781)" fill="white" className='third-opacity'/>
                <rect x="141.908" y="64.0842" width="42.5454" height="14" transform="rotate(-45 141.908 64.0842)" fill="white" className='third-opacity'/>
                <rect x="43.8995" y="34" width="42.5454" height="14" transform="rotate(45 43.8995 34)" fill="white" className='third-opacity'/>
                <rect x="150.899" y="141" width="43.2146" height="14" transform="rotate(45 150.899 141)" fill="white" className='third-opacity'/>
                <rect x="68" y="205.886" width="195" height="14" transform="rotate(-45 68 205.886)" fill="white" className='opacity-bar4'/>
                <rect x="66" y="203.886" width="200" height="19" transform="rotate(-45 68 205.886)" fill="#D9A569" className='first-draw2'/>
                <rect x="9.89949" y="68" width="195" height="14" transform="rotate(45 9.89949 68)" fill="white" className='opacity-bar1'/>
                <rect x="7.89949" y="64" width="200" height="19" transform="rotate(45 9.89949 68)" fill="#D9A569" className='second-draw'/>
                <rect x="77.8995" width="195" height="14" transform="rotate(45 77.8995 0)" fill="white" className='opacity-bar2'/>
                <rect y="-2" x="75.8995" width="200" height="19" transform="rotate(45 77.8995 0)" fill="#D9A569" className='second-draw2'/>
                <path d="M82 108.163L108.163 82L134.326 108.163L108.163 134.326L82 108.163Z" fill="white" className='third-opacity'/>
            </svg>
        </div>
    );
};

export default Loader;