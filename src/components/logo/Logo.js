import React from 'react';
import Tilt from 'react-parallax-tilt';
import brainImg from './brain.png'

import './Logo.css'
const Logo = () => {
    return (
            <div className='logo-container'>
                <Tilt glareEnable={true} glareMaxOpacity={0.8} glareColor="#ffffff" glarePosition="all">
                    <div className='logo-box br2 shadow-2'>
                        <img src={brainImg} alt="brain" width='80px'/>
                    </div>
                </Tilt>
            </div>
    )
}

export default Logo