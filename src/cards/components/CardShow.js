import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import messages from '../messages'
import { cardCreate } from '../api'
import { deckIndex } from '../../decks/api'
import deckMessages from '../../decks/messages'
// import { store } from '../../store'
import Attack from './Attack'
import Ability from './Ability'

class CardShow extends Component {
  constructor () {
    super()

    this.state = {
      card: {
        name: '',
        deck: '',
        types: [],
        attacks: []
      },
      decks: [],
      type: ''
    }
  }

  componentDidMount () {
    const { user, alert } = this.props
    deckIndex(user)
      .then(res => this.setState({ decks: res.data.decks }))
      .catch(() => alert(deckMessages.deckIndexFailure, 'danger'))
    this.setState({ card: this.props.location.state.card })
    if (this.props.location.state.card.types) {
      this.setState({ type: this.props.location.state.card.types[0] })
    }
  }

  handleSubmit = event => {
    event.preventDefault()
    const { user, alert } = this.props
    cardCreate(user, this.state)
      .then((res) => alert(messages.cardCreateSuccess, 'success'))
      .catch(() => alert(messages.cardCreateFailure, 'danger'))
  }

  handleChange = event => {
    this.setState({ card: {
      ...this.state.card, [event.target.name]: event.target.value
    } })
  }

  render () {
    const { card, decks } = this.state

    if (!card) {
      return <p>loading...</p>
    }

    return (
      <div className="flex-col-center my-2">
        <img className="my-3" src={card.imageUrl}/>
        {card.ability ? (
          <Fragment>
            <h5>Ability:</h5>
            <Ability
              ability={card.ability}
            />
          </Fragment>
        ) : ''}
        {card.attacks ? (
          <Fragment>
            <h5>Attacks:</h5>
            {card.attacks.map(attack => (
              <Attack
                key={attack.name}
                attack={attack}
              />
            ))}
          </Fragment>
        ) : ''}
        {decks.length > 0 ? (
          <Form onSubmit={this.handleSubmit}>
            <select className="btn drop-search" onChange={this.handleChange} id="deck-select" name="deck">
              <option value="">--Choose a deck--</option>
              {decks.map(deck => (
                <option key={deck.id} value={deck.id}>{deck.title}</option>
              ))}
            </select>
            <Button className="m-2" variant="info" type="submit">Add</Button>
          </Form>
        ) : ''}
      </div>
    )
  }
}

export default withRouter(CardShow)
