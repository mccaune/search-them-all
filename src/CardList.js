import React from 'react';
import Card from './Card';

// const CardList = ({pokemons, pokemonData}) => {
//     return (
//         <div>
//             {
//                 pokemons.map((pokemon, i) => {
//                     return  (
//                         <Card 
//                             key = {pokemons[i].url.match(/\b[0-9]+/gi)} 
//                             id = {pokemons[i].url.match(/\b[0-9]+/gi)} 
//                             name = {pokemons[i].name}
//                             //test = {pokemonData[i].name}
//                         />
//                     );
//                 })
//             }
//         </div>
//     );
// }


const CardList = ({ pokemons }) => {
    const cardComponent = pokemons.map((pokemon, i) => {
        return  ( <Card 
        key = {pokemons[i].url.match(/\b[0-9]+/gi)} 
        id = {pokemons[i].url.match(/\b[0-9]+/gi)} 
        name = {pokemons[i].name}
        />
        );
})

    return (
        <div>
            { cardComponent }
        </div>
    );
}

export default CardList;

