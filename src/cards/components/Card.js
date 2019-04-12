import React, { Component, Fragment } from 'react'

class Card extends Component {
  constructor () {
    super()

    this.state = {
      add: false
    }
  }

  render () {
    const { image } = this.props
    return (
      <Fragment>
        <img src={image}/>
      </Fragment>
    )
  }
}

export default Card
