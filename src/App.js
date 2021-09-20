import React, { Component } from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import CardList from './CardList';
import SearchBox from './SearchBox';
import Pokemon from './Pokemon';

import './App.css';


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
        fetch('https://pokeapi.co/api/v2/pokemon?limit=200')
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
        const filteredPokemons = this.state.pokemons.filter(pokemon => {
            return pokemon.name.includes(this.state.searchfield.toLowerCase());
        })
        if (this.state.pokemons.length === 0){
            return <h1>Loading</h1>
        } else {
            return (
                <Router>
                    <div>
                    <div className='tc sticky'>
                    <h1 className='f1'>Search them all</h1>
                        <SearchBox searchChange = {this.onSearchChange} />
                    </div>
                    <div className="top">
                            <Switch >
                                <Route exact path="/" render={() =>  <CardList pokemons={filteredPokemons} />}/>
                                <Route exact path="/pokemon/:id" component={Pokemon}/>
                            </Switch>
                    </div>
                    </div>
                </Router>
                );
            }
    }    
}

export default App;