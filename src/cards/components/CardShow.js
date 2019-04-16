import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import messages from '../messages'
import { cardCreate } from '../api'
import { deckIndex } from '../../decks/api'
import deckMessages from '../../decks/messages'
import { store } from '../../store'
import Attack from './Attack'

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
    const { card, decks, type } = this.state
    const typeObj = store.types.find(obj => obj.type === type)

    if (!card) {
      return <p>loading...</p>
    }

    return (
      <Fragment>
        <img src={card.imageUrl}/>
        {typeObj ? (
          <img src={typeObj.imageUrl}/>
        ) : ''}
        {card.attacks ? (
          <Fragment>
            {card.attacks.map(attack => (
              <Attack
                key={attack.name}
                attack={attack}
              />
            ))}
          </Fragment>
        ) : ''}
        <Form onSubmit={this.handleSubmit}>
          <select onChange={this.handleChange} id="deck-select" name="deck">
            <option value="">--Choose a deck--</option>
            {decks.map(deck => (
              <option key={deck.id} value={deck.id}>{deck.title}</option>
            ))}
          </select>
          <Button variant="info" type="submit">Submit</Button>
        </Form>
      </Fragment>
    )
  }
}

export default withRouter(CardShow)
