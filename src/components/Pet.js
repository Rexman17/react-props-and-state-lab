import React from 'react'

class Pet extends React.Component {

  onAdoptPet = (petId) => {
    // console.log(e.target.id);
    // call the callback passed from app
    this.props.onAdoptPet(petId)
  }

  render() {
    // destructuring
    const { name, age, weight, gender, type, isAdopted, id } = this.props.pet

    return (
      <div className="card">
        <div className="content">
          <a className="header">
            {gender === "female" ? '♀':'♂'}
            {name}
          </a>
          <div className="meta">
            <span className="date">{type}</span>
          </div>
          <div className="description">
            <p>Age: {age}</p>
            <p>Weight: {weight}</p>
          </div>
        </div>
        <div className="extra content">
        {isAdopted ?
          <button className="ui disabled button">Already adopted</button>
          :
          <button id={id} onClick={() => this.onAdoptPet(id)} className="ui primary button">Adopt pet</button>
        }

        </div>
      </div>
    )
  }
}

export default Pet
