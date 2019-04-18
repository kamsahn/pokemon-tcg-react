import React, { Component } from 'react'
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
        <div className="flex-col-center my-3">
          <p>Loading deck...</p>
        </div>
      )
    }

    return (
      <div className="flex-col-center my-3">
        <h4 className="my-2">{deck.title}</h4>
        <hr></hr>
        {deck.cards ? (
          <div>
            {sortedCards(deck.cards).map(card => {
              return (
                <p key={card._id}>
                  <Link to={{
                    pathname: '/card-delete',
                    state: { card: {
                      name: card.name,
                      id: card._id
                    } }
                  }}>
                    <img className="sm-icon mx-2" src='https://i.imgur.com/Odp5zZY.jpg'/>
                  </Link>
                  {card.types ? (
                    <img className="mx-1" src={store.types.find(obj => obj.type === card.types).imageUrl}/>
                  ) : (
                    <img className="sm-icon mx-1" src={store.types[9].imageUrl}/>
                  )}
                  <Link className="dark-link" to={{
                    pathname: '/card-show',
                    state: { card, noAdd: true }
                  }}>{card.name} ({store.sets.find(obj => obj.code === card.setCode).name})</Link>
                </p>
              )
            })}
          </div>
        ) : (
          <p>No cards in this deck yet. Try adding some!</p>
        )}
        <hr></hr>
        {deck.wins > -1 ? (<p>Wins: {deck.wins}</p>) : ''}
        {deck.loses > -1 ? (<p>Loses: {deck.loses}</p>) : ''}
        <Link className="my-2" to={`${id}/edit`}>Edit</Link>
        <Link className="my-2" to={{
          pathname: `${id}/delete`,
          state: { deck: {
            title: deck.title,
            id: deck._id
          } }
        }}>Delete</Link>
        <Link className="btn btn-danger my-2" to='/search-name'>Search By Name</Link>
        <Link className="btn btn-danger my-2" to='/search-set'>Search By Set</Link>
        {deck.cards && deck.cards.length > 6 ? (
          <DeckDraw deck={deck}/>
        ) : ''}
      </div>
    )
  }
}

export default withRouter(DeckShow)
