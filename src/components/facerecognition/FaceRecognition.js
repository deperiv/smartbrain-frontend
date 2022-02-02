import React       from 'react';
import BoundingBox from '../boundingbox/BoundingBox'

const FaceRecognition = ({imageUrl, boxes}) => {
    return (
        <div className='center ma4'>
            <div className='absolute mt2'>
                <img id="inputimage" src={imageUrl} alt="" width="500px" height="auto"/>
                {
                    boxes.map((box, index) => {
                        return (
                            <BoundingBox 
                                key={index}
                                box={box}
                            />
                        );                        
                    })
                }
            </div>            
        </div>
    )
}

export default FaceRecognition