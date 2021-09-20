import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ name, id}) => {
    return (
        <div className='tc grow br3 pa3 ma2 dib bw2 shadow-5 card'>
            <Link className = 'cardLink'  to = {`pokemon/${id}`}>
                {/* <img className = "imgCard" alt='pokemon' src={`https://pokeres.bastionbot.org/images/pokemon/${id}.png`} /> */}
                <img className = "imgCard" alt='pokemon' src={`https://static.pokemonpets.com/images/monsters-images-300-300/${id}-${name}.webp`}/>
                <div>
                    <h2>{name
                    .toLowerCase()
                    .split(' ')
                    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                    .join(' ')}</h2>
                    <p>No. {id}</p>
                </div>
            </Link>
        </div>
    );
}

export default Card;