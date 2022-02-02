import React from 'react';

const BoundingBox = ({box}) => {
    return (
            <div className='bounding-box' 
                 style={{
                    left:`${box.leftCol}px`
                    ,top:`${box.topRow}px`
                    ,width:`${box.width}px`
                    ,height:`${box.height}px`
                 }}>
            </div>
    )
}

export default BoundingBox 