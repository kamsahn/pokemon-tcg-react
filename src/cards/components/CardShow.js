import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import messages from '../messages'
import { cardCreate } from '../api'
import { deckIndex } from '../../decks/api'
import deckMessages from '../../decks/messages'

class CardShow extends Component {
  constructor () {
    super()

    this.state = {
      card: {
        name: '',
        deck: ''
      },
      decks: []
    }
  }

  componentDidMount () {
    const { user, alert } = this.props
    deckIndex(user)
      .then(res => this.setState({ decks: res.data.decks }))
      .catch(() => alert(deckMessages.deckIndexFailure, 'danger'))
    this.setState({ card: this.props.location.state.card })
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

    if (!card || !decks) {
      return <p>loading...</p>
    }

    return (
      <Fragment>
        <img src={card.imageUrl}/>
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
