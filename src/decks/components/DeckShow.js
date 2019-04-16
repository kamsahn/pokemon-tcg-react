import React, { Component, Fragment } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { deckShow } from '../api'
import messages from '../messages'
import { store } from '../../store'
import DeckDraw from './DeckDraw'

const sortedCards = cards => cards.sort((a, b) => {
  if (a.name < b.name) { return -1 }
  if (a.name > b.name) { return 1 }
  return 0
})

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
            {sortedCards(deck.cards).map(card => {
              return (
                <p key={card._id}>
                  {card.types ? (
                    <img className="mx-1" src={store.types.find(obj => obj.type === card.types).imageUrl}/>
                  ) : ''}
                  {card.name} <Link className="sm-btn-x" to={{
                    pathname: '/card-delete',
                    state: { card: {
                      name: card.name,
                      id: card._id
                    } }
                  }}>X</Link></p>
              )
            })}
          </Fragment>
        ) : (
          <p>No cards in this deck yet. Try adding some!</p>
        )}
        {deck.wins > -1 ? (<p>Wins: {deck.wins}</p>) : ''}
        {deck.loses > -1 ? (<p>Loses: {deck.loses}</p>) : ''}
        <Link to={`${id}/edit`}>Edit</Link>
        <Link to={{
          pathname: `${id}/delete`,
          state: { deck: {
            title: deck.title,
            id: deck._id
          } }
        }}>Delete</Link>
        <Link className="btn btn-info" to='/search-name'>Search By Name</Link>
        <Link className="btn btn-info" to='/search-set'>Search By Set</Link>
        {deck.cards && deck.cards.length > 6 ? (
          <DeckDraw deck={deck}/>
        ) : ''}
      </Fragment>
    )
  }
}

export default withRouter(DeckShow)
