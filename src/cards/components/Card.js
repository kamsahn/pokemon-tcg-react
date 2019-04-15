import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'

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
        <Link to='/card-show'>
          <img src={image}/>
        </Link>
      </Fragment>
    )
  }
}

export default Card
