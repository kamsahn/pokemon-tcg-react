import React, { Component, Fragment } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { deckShow } from '../api'
import messages from '../messages'

class DeckShow extends Component {
  constructor () {
    super()

    this.state = {
      deck: null
    }
  }

  componentDidMount () {
    const { user, alert } = this.props
    const id = this.props.match.params.id
    deckShow(user, id)
      .then(res => this.setState({ deck: res.data.deck }))
      .catch(() => alert(messages.deckShowFailure, 'danger'))
  }

  render () {
    const { deck } = this.state
    const id = this.props.match.params.id

    if (!deck) {
      return (
        <p>Loading deck...</p>
      )
    }

    return (
      <Fragment>
        <h4>{deck.title}</h4>
        {deck.cards ? (
          <Fragment>
            {deck.cards.map(card => (
              <li key={card.id}>{card.name}</li>
            ))}
          </Fragment>
        ) : (
          <p>No cards in this deck yet. Try adding some!</p>
        )}
        <Link to={`${id}/edit`}>Edit</Link>
        <Link to={`${id}/delete`}>Delete</Link>
        <Link className="btn btn-info" to='/search-name'>Search By Name</Link>
        <Link className="btn btn-info" to='/search-set'>Search By Set</Link>
      </Fragment>
    )
  }
}

export default withRouter(DeckShow)
