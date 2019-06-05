import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  // helper to fetch pets
  fetchPets = () => {
    // first see which type is selected to then know which URL to fetch from
    let queryParam = ''

    switch(this.state.filters.type) {
      case 'all':
        queryParam = ""
        break;
      case 'cat':
        queryParam = "?type=cat"
        break;
      case 'dog':
        queryParam = "?type=dog"
        break;
      case 'micropig':
        queryParam = "?type=micropig"
        break;
      default:
    }
    //now fetch once queryParam is set
    fetch(`/api/pets${queryParam}`, { method: "GET" })
      .then(r => r.json())
      .then(arrayOfPetObjects => {
        this.setState({
          pets: arrayOfPetObjects
        }, () => console.log("NEW ST8", this.state))
      })
  }

  // will be used as a cb prop passed to Filters component:
  onChangeType = (type) => {
    // console.log("IN APP", type);
    this.setState({
      filters: {
        type: type
      }
    })
  }

  onFindPetsClick = () => {
    // console.log('trying to fetch pets');
    // fetch pets and update pets array in state
    // console.log("now onFindPetsClick in app");
    this.fetchPets()
  }

  onAdoptPet = (petId) => {
    // console.log("the pet id in app to adopt is", petId);
    // have to update pets array to change this specific pets isAdopted attribute
    let foundPet = this.state.pets.find((pet) => {
      return pet.id === petId
    })

    foundPet.isAdopted = true
    // console.log(foundPet);
    // console.log(this.state.pets);
    this.setState({
      pets: this.state.pets
    }, () => console.log(this.state.pets))
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters
                onChangeType={this.onChangeType}
                onFindPetsClick={this.onFindPetsClick}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser
                pets={this.state.pets}
                onAdoptPet={this.onAdoptPet}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
