import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Card from './Card';
import {pokemons} from './pokemons';
import registerServiceWorker from './registerServiceWorker';
import 'tachyons'; 

ReactDOM.render(
                <div>
                    <Card id = {1} name = {pokemons[0].name} />
                    <Card id = {2} name = {pokemons[1].name} />
                    <Card id = {3} name = {pokemons[2].name} />
                </div>
, document.getElementById('root'));
registerServiceWorker();
