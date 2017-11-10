import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Pokemon from './Pokemon';

class App extends Component {
  constructor(props) {
    super(props); //must be first line
    this.state = {
      pokemans: [
        {
          id: 1,
          name: "Chandelure",
          level: 57,
          eggGroup: "Amorphous",
          update: false
        }, {
          id: 2,
          name: "Dusknoir",
          level: 67,
          eggGroup: "Amorphous",
          update: false
        }, {
          id: 3,
          name: "Weavile",
          level: 55,
          eggGroup: "Field",
          update: false
        }, {
          id: 4,
          name: "Dragonite",
          level: 72,
          eggGroup: "Dragon/Water",
          update: false
        }, {
          id: 5,
          name: "Jirachi",
          level: 59,
          eggGroup: "None",
          update: false
        }, {
          id: 6,
          name: "Gardevoir",
          level: 43,
          eggGroup: "Amorphous",
          update: false
        }
      ]
    }
    this.handleSubmitInParent = (dataFromForm) => {
      let pokemans = [...this.state.pokemans];
      pokemans.push({
        id: pokemans.length,
        name: dataFromForm.name,
        level: dataFromForm.level,
        eggGroup: dataFromForm.eggGroup,
        update: false
      });
      this.setState({ pokemans: pokemans });
    }
    this.handleUpdateInParent = (dataForUpdate) => {
      let pokemans = [...this.state.pokemans];
      let toUpdate = pokemans.findIndex((pokemon) => pokemon.update === true);
      pokemans[toUpdate].name = dataForUpdate.name;
      pokemans[toUpdate].level = dataForUpdate.level;
      pokemans[toUpdate].eggGroup = dataForUpdate.eggGroup;
      pokemans[toUpdate].update = false;
      this.setState({ pokemans: pokemans });
    }

    this.deletePokemon = (pokemonIndex) => {
      //copy by values not by reference
      const pokemans = [...this.state.pokemans];
      //remove pokemon
      pokemans.splice(pokemonIndex, 1);
      //update state with the new array
      this.setState({ pokemans: pokemans })
    }
    this.updatePokemon = (pokemonIndex) => {
      const pokemans = [...this.state.pokemans];
      //set textBoxes 
      pokemans[pokemonIndex-1].update = true;
      //update state with the new array
      this.setState({ pokemans: pokemans })
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Something to do with Pokemon</h1>
        </header>
        <FormComponent onSubmit={this.handleSubmitInParent} />
        <ListOfPokemans pokemans={this.state.pokemans} onSubmit={this.handleUpdateInParent} updatePokemon={this.updatePokemon} deletePokemon={this.deletePokemon} />
      </div>
    );
  }
}

class FormComponent extends Component {
  constructor(props) {
    super(props);
    //function "factory" that will create a function to update changes in a textBox
    this.handleChange = (valueName) => (event) => this.setState({ [valueName]: event.target.value });

    this.handleSubmit = (event) => {
      event.preventDefault();
      this.props.onSubmit(this.state);
      this.setState({
        name: "",
        level: "",
        eggGroup: ""
      });
    }
    this.state = {
      name: "",
      level: "",
      eggGroup: ""
    };
  }
  render() {
    const style = {
      backgroundColor: 'black',
      padding: '8px'
    };
    return (
      <form id="addMyData" onSubmit={this.handleSubmit} style={style}>
        <input type="text" name="name" value={this.state.name} onChange={this.handleChange("name")} />
        <input type="number" name="level" value={this.state.level} onChange={this.handleChange("level")} />
        <input type="text" name="eggGroup" value={this.state.eggGroup} onChange={this.handleChange("eggGroup")} />
        <button onClick={this.handleSubmit}> Add Pokemon </button>
      </form>
    )
  }
}

class ListOfPokemans extends Component {
  constructor(props) {
    super(props);
    //function "factory" that will create a function to update changes in a textBox
    this.handleChange = (valueName) => (event) => this.setState({ [valueName]: event.target.value });

    this.handelDelete = (pokemon) => {
      this.props.deletePokemon(pokemon.id);
    }
    this.handelUpdate = (pokemonId) => {
      this.props.updatePokemon(pokemonId)
    }


    this.handleSubmit = () => {      
      this.props.onSubmit(this.state);
      this.setState({
        name: "",
        level: "",
        eggGroup: ""
      });
    }    
    this.state = {
      name: "",
      level: "",
      eggGroup: ""
    };

  }
  render() {
    return (
      <div id="overflowContainer">
        <div id="overflow" >
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Level</th>
                <th>EggGroup</th>
                <th colSpan="2">Action</th>
              </tr>
            </thead>
            <tbody id="pokemonDetails">
              {this
                .props
                .pokemans
                .map((pokemon) => {
                  if (pokemon.update) {
                    return <Pokemon
                    deletePokemon={() => this.handelDelete(pokemon)}
                    toUpdate={pokemon.update}
                    updateName={<input type="text" name="name" value={this.state.name} onChange={this.handleChange("name")} placeholder={pokemon.name}/>}
                    updateLevel={<input type="number" name="level" value={this.state.level} onChange={this.handleChange("level")} placeholder={pokemon.level}/>}
                    updateEggGroup={<input type="text" name="eggGroup" value={this.state.eggGroup} onChange={this.handleChange("eggGroup")} placeholder={pokemon.eggGroup}/>}
                    key={pokemon.id}
                    updateSubmit={<button onClick={() => this.handleSubmit()}> Add Pokemon </button>}/>
                  } else {
                    return <Pokemon
                    deletePokemon={() => this.handelDelete(pokemon)}
                    toUpdate={pokemon.update}
                    name={pokemon.name}
                    level={pokemon.level}
                    eggGroup={pokemon.eggGroup}
                    key={pokemon.id}
                    updatePokemon={() => this.handelUpdate(pokemon.id)} />
                  }                  
                })}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
export default App;
