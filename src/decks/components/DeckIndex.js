import React, { Component, Fragment } from 'react'
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
      return <p>Loading decks...</p>
    }

    return (
      <Fragment>
        {decks.length === 0 ? (
          <p>You do not have any decks yet. Make a new one!</p>
        ) : (
          <Fragment>
            {decks.map(deck => (
              <p key={deck.id}>Title: {deck.title}</p>
            ))}
          </Fragment>
        )}
        <div>
          <Link className="btn btn-info my-2" to={'/decks-new'}>New Deck</Link>
        </div>
      </Fragment>
    )
  }
}

export default DeckIndex
