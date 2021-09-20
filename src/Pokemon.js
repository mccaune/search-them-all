import React, { Component } from 'react';
import Axios from 'axios';

const TYPE_COLORS = {
  bug: 'B1C12E',
  dark: '4F3A2D',
  dragon: '755EDF',
  electric: 'FCBC17',
  fairy: 'F4B1F4',
  fighting: '823551D',
  fire: 'E73B0C',
  flying: 'A3B3F7',
  ghost: '6060B2',
  grass: '74C236',
  ground: 'D3B357',
  ice: 'A3E7FD',
  normal: 'C8C4BC',
  poison: '934594',
  psychic: 'ED4882',
  rock: 'B9A156',
  steel: 'B5B5C3',
  water: '3295F6'
};

export default class Pokemon extends Component {
    state = {
        name: '',
        id: '',
        types: [],
        description: '',
        statTitleWidth: 3,
        statBarWidth: 9,
        stats: {
        hp: '',
        attack: '',
        defense: '',
        speed: '',
        specialAttack: '',
        specialDefense: ''
        },
        height: '',
        weight: '',
        eggGroups: '',
        catchRate: '',
        abilities: '',
        genderRatioMale: '',
        genderRatioFemale: '',
        evs: '',
        hatchSteps: '',
        themeColor: '#EF5350'
    };

  async componentDidMount() {
    const { id } = this.props.match.params;

    // Urls for pokemon information
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${id}/`;
    const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${id}/`;

    // Get Pokemon Information
    const pokemonRes = await Axios.get(pokemonUrl);

    const name = pokemonRes.data.name;

    let { hp, attack, defense, speed, specialAttack, specialDefense } = '';

    pokemonRes.data.stats.map(stat => {
      switch (stat.stat.name) {
        case 'hp':
          hp = stat['base_stat'];
          break;
        case 'attack':
          attack = stat['base_stat'];
          break;
        case 'defense':
          defense = stat['base_stat'];
          break;
        case 'speed':
          speed = stat['base_stat'];
          break;
        case 'special-attack':
          specialAttack = stat['base_stat'];
          break;
        case 'special-defense':
          specialDefense = stat['base_stat'];
          break;
        default:
          break;
      }
    });

    const types = pokemonRes.data.types.map(type => type.type.name);

    const themeColor = `${TYPE_COLORS[types[types.length - 1]]}`;

    // Get Pokemon Description .... Is from a different end point uggh
    await Axios.get(pokemonSpeciesUrl).then(res => {
      let description = '';
      res.data.flavor_text_entries.some(flavor => {
        if (flavor.language.name === 'en') {
          description = flavor.flavor_text;
          return;
        }
      });

      this.setState({
        description,
      });
    });

    this.setState({
      id,
      name,
      types,
      stats: {
        hp,
        attack,
        defense,
        speed,
        specialAttack,
        specialDefense
      },
      themeColor,
    });
  }

  render() {
    return (
      <div className='wrap'>
        <div className='pokeContainer br3 card'>
        <div className="headerId ">
          {this.state.id} : {this.state.name
                    .toLowerCase()
                    .split(' ')
                    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                    .join(' ')}
        </div>

        <div className="headerInfo ">
          {this.state.types.map(type => (
            <span className=" headerInfo"
              key={type}
              style={{
                backgroundColor: `#${TYPE_COLORS[type]}`,
                color: 'white',
                paddingLeft: `1rem`,
                marginLeft: `1rem`,
              }}
            >
              {type
                .toLowerCase()
                .split(' ')
                .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                .join(' ')}
            </span>
          ))}
          
        </div>
                
        {/* <img className="imagePoke" src={`https://pokeres.bastionbot.org/images/pokemon/${this.state.id}.png`}/> */}
        <img className="imagePoke" src={`https://static.pokemonpets.com/images/monsters-images-300-300/${this.state.id}-${this.state.name}.webp`}/>


        <div className="infoPoke">

          <div className="row align-items-center">
            <div className={`col-12 col-md-${this.state.statTitleWidth}`}>
              HP
            </div>
            <div className={`col-12 col-md-${this.state.statBarWidth}`}>
              <div className="progress">
                <div
                  className="progress-bar "
                  role="progressbar"
                  style={{
                    width: `${this.state.stats.hp}%`,
                    backgroundColor: `#${this.state.themeColor}`
                  }}
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  <small>{this.state.stats.hp}</small>
                </div>
              </div>
            </div>
          </div>
          <div className="row align-items-center">
                  <div className={`col-12 col-md-${this.state.statTitleWidth}`}>
                    Attack
                  </div>
                  <div className={`col-12 col-md-${this.state.statBarWidth}`}>
                    <div className="progress">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{
                          width: `${this.state.stats.attack}%`,
                          backgroundColor: `#${this.state.themeColor}`
                        }}
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <small>{this.state.stats.attack}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className={`col-12 col-md-${this.state.statTitleWidth}`}>
                    Defense
                  </div>
                  <div className={`col-12 col-md-${this.state.statBarWidth}`}>
                    <div className="progress">
                      <div
                        className="progress-bar "
                        role="progressbar"
                        style={{
                          width: `${this.state.stats.defense}%`,
                          backgroundColor: `#${this.state.themeColor}`
                        }}
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <small>{this.state.stats.defense}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className={`col-12 col-md-${this.state.statTitleWidth}`}>
                    Speed
                  </div>
                  <div className={`col-12 col-md-${this.state.statBarWidth}`}>
                    <div className="progress">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{
                          width: `${this.state.stats.speed}%`,
                          backgroundColor: `#${this.state.themeColor}`
                        }}
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <small>{this.state.stats.speed}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className={`col-12 col-md-${this.state.statTitleWidth}`}>
                    Sp Atk
                  </div>
                  <div className={`col-12 col-md-${this.state.statBarWidth}`}>
                    <div className="progress">
                      <div
                        className="progress-bar "
                        role="progressbar"
                        style={{
                          width: `${this.state.stats.specialAttack}%`,
                          backgroundColor: `#${this.state.themeColor}`
                        }}
                        aria-valuenow={this.state.stats.specialAttack}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <small>{this.state.stats.specialAttack}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className={`col-12 col-md-${this.state.statTitleWidth}`}>
                    Sp Def
                  </div>
                  <div className={`col-12 col-md-${this.state.statBarWidth}`}>
                    <div className="progress">
                      <div
                        className="progress-bar "
                        role="progressbar"
                        style={{
                          width: `${this.state.stats.specialDefense}%`,
                          backgroundColor: `#${this.state.themeColor}`
                        }}
                        aria-valuenow={this.state.stats.specialDefense}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <small>{this.state.stats.specialDefense}</small>
                      </div>
                    </div>
                  </div>
                </div> 
        </div>




        <div className="description">{this.state.description}
        
        
        
        </div>


        <div className="footer">
        <hr></hr>
        Data From{' '}
            <a href="https://pokeapi.co/" target="_blank" className="card-link">
              PokeAPI.co
            </a>
        </div>
      </div>
      </div>
      
    );
  }
}