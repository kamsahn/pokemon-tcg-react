import React, { Component, Fragment } from 'react'
import Button from 'react-bootstrap/Button'
import { store } from '../../store'
const shuffle = require('knuth-shuffle').knuthShuffle

class DeckDraw extends Component {
  constructor () {
    super()

    this.state = {
      hand: []
    }
  }

  handleClick = () => {
    const { deck } = this.props
    const shuffled = shuffle(deck.cards.slice(0))
    const hand = []
    let c = 0
    while (c < 7) {
      hand.push(shuffled.shift())
      c++
    }
    this.setState({ hand })
  }

  render () {
    const { hand } = this.state

    return (
      <Fragment>
        <Button onClick={this.handleClick}>Test Draw</Button>
        {hand ? (
          hand.map(card => (
            <p key={card._id}>
              {card.types ? (
                <img className="mx-1" src={store.types.find(obj => obj.type === card.types).imageUrl}/>
              ) : ''}
              {card.name}
            </p>
          ))
        ) : ''}
      </Fragment>
    )
  }
}

export default DeckDraw
