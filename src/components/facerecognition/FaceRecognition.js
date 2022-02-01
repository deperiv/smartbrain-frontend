import React from 'react';
// import './FaceRecognition.css'

const FaceRecognition = ({imageUrl}) => {
    return (
        <div className='center ma4'>
            <div className='absolute mt2'>
                <img src={imageUrl} alt="img" width="500px" height="auto"/>
            </div>            
            {console.log(imageUrl)}
        </div>
    )
}

export default FaceRecognition