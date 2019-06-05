import React from 'react'

import Pet from './Pet'

class PetBrowser extends React.Component {

  render() {
    
    const { onAdoptPet } = this.props

    const mappedPets = this.props.pets.map((petObj) => {
      return <Pet key={petObj.id} pet={petObj} onAdoptPet={this.props.onAdoptPet} />
    })

    return <div className="ui cards">
            {mappedPets}
          </div>
  }
}

export default PetBrowser
