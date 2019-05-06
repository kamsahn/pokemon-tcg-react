import React, { Component, Fragment } from 'react'
import { getCardsBySet, advSearchPokemon, advSearchTrainer } from '../api.js'
import messages from '../messages'
import Card from './Card'

const sortedCards = cards => cards.sort((a, b) => a.number - b.number)

class CardSetSearch extends Component {
  constructor () {
    super()

    this.state = {
      cards: null,
      setCode: null
    }
  }

  handleChangeSet = event => {
    this.setState({ setCode: event.target.value })
  }

  handleChangeSupertype = event => {
    this.setState({ supertype: event.target.value })
  }

  handleChangeTypes = event => {
    this.setState({ types: event.target.value })
  }

  clickSearch = (event) => {
    event.preventDefault()
    const { setCode, types, supertype } = this.state
    const { alert } = this.props
    if (setCode && types && supertype) {
      advSearchPokemon(setCode, types, supertype)
        .then(res => res.length > 0 ? this.setState({ cards: sortedCards(res) }) : alert(messages.noResults, 'warning'))
        .catch(() => alert(messages.searchBySetFailure, 'danger'))
    } else if (setCode && supertype) {
      advSearchTrainer(setCode, supertype)
        .then(res => res.length > 0 ? this.setState({ cards: sortedCards(res) }) : alert(messages.noResults, 'warning'))
        .catch(() => alert(messages.searchBySetFailure, 'danger'))
    } else if (setCode) {
      getCardsBySet(setCode)
        .then(res => this.setState({ cards: sortedCards(res) }))
        .catch(() => alert(messages.searchBySetFailure, 'danger'))
    } else {
      alert(messages.blankField, 'warning')
    }
  }

  clickAdvanced = (event) => {
    event.preventDefault()
    this.setState({ adv: 'selected' })
  }

  render () {
    const { cards, adv, supertype } = this.state
    return (
      <div className="flex-col-center my-3">
        <form className="flex-col-center" onSubmit={this.clickSearch}>
          <select className="btn drop-search" onChange={this.handleChangeSet} id="set-select" name="set-select">
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
          {adv ? (
            <Fragment>
              <select className="btn drop-search" onChange={this.handleChangeSupertype} id="supertype-select" name="supertype-select">
                <option value="">--Choose a card type--</option>
                <option value="Pokémon">Pokemon</option>
                <option value="Trainer">Trainer</option>
              </select>
              {supertype === 'Pokémon' ? (
                <select className="btn drop-search" onChange={this.handleChangeTypes} id="types-select" name="types-select">
                  <option value="">--Choose a pokemon type--</option>
                  <option value="Colorless">Colorless</option>
                  <option value="Darkness">Darkness</option>
                  <option value="Fighting">Fighting</option>
                  <option value="Fire">Fire</option>
                  <option value="Grass">Grass</option>
                  <option value="Lightning">Lightning</option>
                  <option value="Metal">Metal</option>
                  <option value="Psychic">Psychic</option>
                  <option value="Water">Water</option>
                </select>
              ) : ('')}
            </Fragment>
          ) : (
            <p className="my-1 pseudo-link" onClick={this.clickAdvanced}>Advanced Search</p>
          )}
          <input type="submit" className="btn btn-danger space" value="Get Cards"/>
        </form>

        {cards ? (
          cards.map(card => (
            <Card
              key={card.id}
              card={card}
              user={this.props.user}
            />
          ))
        ) : '' }
      </div>
    )
  }
}

export default CardSetSearch
