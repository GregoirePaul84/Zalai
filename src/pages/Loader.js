import React, { useEffect } from 'react';

const Loader = () => {

    useEffect(() => {
        const selectContainer = document.querySelector('.home-loader');

        const selectLetter1 = document.querySelector('.blink-text1');
        const selectLetter2 = document.querySelector('.blink-text2');
        const selectLetter3 = document.querySelector('.blink-text3');
        const selectLetter4 = document.querySelector('.blink-text4');
        const selectLetter5 = document.querySelector('.blink-text5');

        function replayAnimation() {

            if (selectContainer.classList.contains('loader-cancelled')) {
                clearInterval(interval);
                return;
            }
            
            selectLetter1.style.animation = 'none';
            selectLetter2.style.animation = 'none';
            selectLetter3.style.animation = 'none';
            selectLetter4.style.animation = 'none';
            selectLetter5.style.animation = 'none';
            
    
            setTimeout(() => {
                selectLetter1.style.animation = '1s ease-out 0.2s 1 normal forwards running opacityLoader';
                selectLetter2.style.animation = '1s ease-out 0.7s 1 normal forwards running opacityLoader';
                selectLetter3.style.animation = '1s ease-out 1.3s 1 normal forwards running opacityLoader';
                selectLetter4.style.animation = '1s ease-out 1.8s 1 normal forwards running opacityLoader';
                selectLetter5.style.animation = '1s ease-out 2.3s 1 normal forwards running opacityLoader';
            }, 200);
        }

        let interval = setInterval(replayAnimation, 3000)

    }, [])

    return (
        <div id="loader-container">
            <span className='blink-text1'>Z</span>
            <span className='blink-text2'>a</span>
            <span className='blink-text3'>l</span>
            <span className='blink-text4'>a</span>
            <span className='blink-text5'>ï</span>
        </div>
    );
};

export default Loader;