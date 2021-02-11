import React from 'react';

const Card = ({ name, id }) => {
    return (
        <div className='tc grow bg-light-green br3 pa3 ma2 dib bw2 shadow-5'>
        <img alt='pokemon' src={`https://pokeres.bastionbot.org/images/pokemon/${id}.png`} />
        <div>
            <h2>{name}</h2>
            <p>{id}</p>
        </div>
        </div>
    );
}

export default Card;