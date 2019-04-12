import React, { Component, Fragment } from 'react'

class Card extends Component {
  constructor () {
    super()

    this.state = {
      add: false
    }
  }

  render () {
    const { name, image, id } = this.props
    return (
      <Fragment>
        <img src={image}/>
        <p>{name}</p>
        <p>{id}</p>
      </Fragment>
    )
  }
}

export default Card
