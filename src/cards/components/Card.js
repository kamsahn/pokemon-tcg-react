import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Card extends Component {
  constructor () {
    super()

    this.state = {
      add: false
    }
  }

  render () {
    const { card, user } = this.props
    return (
      <div className="my-1">
        {user ? (
          <Link to={{
            pathname: '/card-show',
            state: { card }
          }}>
            <img src={card.imageUrl}/>
          </Link>
        ) : (
          <img src={card.imageUrl}/>
        )}
      </div>
    )
  }
}

export default Card
