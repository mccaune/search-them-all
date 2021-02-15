import React, { Component } from 'react';
import CardList from './CardList';
import SearchBox from './SearchBox';
import Scroll from './Scroll'
import './App.css'


class App extends Component {
    constructor(){
        super()
        this.state = {
            pokemons: [],
            pokemonData: [],
            searchfield: ''
        }
    }

    // componentDidMount() {
    //     this.setState({pokemons: pokemons})
    //     fetch('https://pokeapi.co/api/v2/pokemon?limit=100')
    //     .then(response => {
    //         console.log(response.json());
    //     });
    // }

    componentDidMount() {
        fetch('https://pokeapi.co/api/v2/pokemon?limit=30')
        .then(response => {
            //console.log(response.json())
            return response.json();
        })
        .then(pokemons => {
            this.setState({pokemons: pokemons.results})
        });

    }
    
    onSearchChange = (event) => {
        this.setState({searchfield: event.target.value})
    }

    render() {
        const pokemonData = this.state.pokemonData;
        const filteredPokemons = this.state.pokemons.filter(pokemon => {
            return pokemon.name.includes(this.state.searchfield.toLowerCase());
        })
        if (this.state.pokemons.length === 0){
            return <h1>Loading</h1>
        } else {
            return (
                <div className='tc'>
                    <h1 className='f1'>Search them all</h1>
                    <SearchBox searchChange = {this.onSearchChange} />
                    <Scroll>
                        <CardList pokemons={filteredPokemons} pokemonData = {pokemonData}/>
                    </Scroll>
                </div>
                );
            }
    }    
}

export default App;