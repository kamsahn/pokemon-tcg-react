import React, { Component } from 'react'
import { deckIndex } from '../api'
import messages from '../messages'
import { Link } from 'react-router-dom'

class DeckIndex extends Component {
  constructor () {
    super()

    this.state = {
      decks: null
    }
  }
  componentDidMount () {
    const { user, alert } = this.props
    deckIndex(user)
      .then(res => this.setState({ decks: res.data.decks }))
      .catch(() => alert(messages.deckIndexFailure, 'danger'))
  }

  render () {
    const { decks } = this.state

    if (!decks) {
      return (
        <div className="flex-col-center my-3">
          <p>Loading decks...</p>
        </div>
      )
    }

    return (
      <div className="flex-col-center my-3">
        {decks.length === 0 ? (
          <p>You do not have any decks yet. Make a new one!</p>
        ) : (
          <div>
            {decks.map(deck => (
              <li key={deck._id}>
                <Link to={`/decks/${deck._id}`}>{deck.title} created {deck.createdAt.split('T')[0]}</Link>
              </li>
            ))}
          </div>
        )}
        <div>
          <Link className="btn btn-info my-2" to={'/decks-new'}>New Deck</Link>
        </div>
      </div>
    )
  }
}

export default DeckIndex
