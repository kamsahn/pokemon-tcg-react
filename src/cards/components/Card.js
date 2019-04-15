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
    const { image, name, user } = this.props
    return (
      <Fragment>
        {user ? (
          <Link to={{
            pathname: '/card-show',
            state: { card:
              { image, name }
            }
          }}>
            <img src={image}/>
          </Link>
        ) : (
          <img src={image}/>
        )}
      </Fragment>
    )
  }
}

export default Card
