import React, { Component, Fragment } from 'react'
import { getCardsBySet } from '../api.js'
import messages from '../messages'
import Card from './Card'

const sortedCards = cards => cards.sort((a, b) => a.number - b.number)

class CardSetSearch extends Component {
  constructor () {
    super()

    this.state = {
      cards: [],
      setCode: null
    }
  }

  handleChange = event => {
    this.setState({ setCode: event.target.value })
  }

  clickSearch = (event) => {
    event.preventDefault()
    const { setCode } = this.state
    const { alert } = this.props
    getCardsBySet(setCode)
      .then(res => this.setState({ cards: sortedCards(res) }))
      .catch(() => alert(messages.searchBySetFailure, 'danger'))
  }

  render () {
    const { cards } = this.state
    return (
      <Fragment>
        <form onSubmit={this.clickSearch}>
          <select onChange={this.handleChange} id="set-select" name="set-select">
            <option value="">--Choose a set--</option>
            <option value="base1">Base</option>
            <option value="base2">Jungle</option>
            <option value="basep">Wizards Black Star Promos</option>
            <option value="base3">Fossil</option>
            <option value="base4">Base Set 2</option>
            <option value="base5">Team Rocket</option>
            <option value="gym1">Gym Heros</option>
            <option value="gym2">Gym Challenge</option>
            <option value="neo1">Neo Genesis</option>
            <option value="neo2">Neo Discovery</option>
            <option value="si1">Southern Islands</option>
            <option value="neo3">Neo Revolution</option>
            <option value="neo4">Neo Destiny</option>
            <option value="base6">Legendary Collection</option>
            <option value="ecard1">Expedition Base Set</option>
            <option value="ecard2">Aquapolis</option>
            <option value="ecard3">Skyridge</option>
          </select>
          <input type="submit" className="btn btn-info space" value="Get Cards"/>
        </form>

        {cards ? (
          cards.map(card => (
            <Card
              key={card.id}
              id={card.id}
              name={card.name}
              image={card.imageUrl}
              user={this.props.user}
            />
          ))
        ) : '' }
      </Fragment>
    )
  }
}

export default CardSetSearch
