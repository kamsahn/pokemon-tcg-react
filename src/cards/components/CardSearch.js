import React, { Component, Fragment } from 'react'
// import Button from 'react-bootstrap/Button'
import { getCards } from '../api.js'
import Card from './Card'
import { store } from '../../store'

const sortedCards = cards => cards.sort((a, b) => a.number - b.number)

class CardSearch extends Component {
  constructor () {
    super()

    this.state = {
      cards: [],
      set: null
    }
  }

  handleChange = event => {
    this.setState({ set: event.target.value })
  }

  clickSearch = (event) => {
    event.preventDefault()
    const { set } = this.state
    const totalCards = store.sets.find(selected => selected.code === set).totalCards
    store.cards = []
    getCards(set)
      .on('data', response => {
        store.cards.push(response)
        if (store.cards.length === totalCards) {
          this.setState({ cards: sortedCards(store.cards) })
        }
      })
  }

  render () {
    const { cards } = this.state
    return (
      <Fragment>
        <form onSubmit={this.clickSearch}>
          <input name="set" type="text" onChange={this.handleChange}/>
          <input type="submit" className="btn btn-info space" value="Get Cards"/>
        </form>
        {cards && cards.length === 102 ? (
          cards.map(card => (
            <Card
              key={card.id}
              id={card.id}
              name={card.name}
              image={card.imageUrl}
            />
          ))
        ) : '' }
      </Fragment>
    )
  }
}

export default CardSearch
