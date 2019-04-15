import React, { Component, Fragment } from 'react'
import { getCardsByName } from '../api'
import messages from '../messages'
import { store } from '../../store'
import Card from './Card'

class CardNameSearch extends Component {
  constructor () {
    super()

    this.state = {
      name: '',
      cards: []
    }
  }

  handleSubmit = event => {
    event.preventDefault()
    const setCodes = store.sets.map(set => set.code)
    const { alert } = this.props
    getCardsByName(this.state.name)
      .then(res => res.filter(card => setCodes.includes(card.setCode)))
      .then(res => this.setState({ cards: res }))
      .then(() => {
        if (this.state.cards.length === 0) {
          alert(messages.searchByNameFailure, 'danger')
        }
      })
      .catch(() => alert(messages.searchByNameFailure, 'danger'))
  }

  handleChange = event => {
    this.setState({ name: event.target.value })
  }

  render () {
    const { cards } = this.state

    return (
      <Fragment>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} type='text' name='name' placeholder='e.g. Dunsparce'/>
          <input className="btn btn-info mx-3" type='submit' value='Get Card'/>
        </form>

        {cards ? (
          <Fragment>
            {cards.map(card => {
              return (
                <Card
                  key={card.id}
                  card={card}
                  user={this.props.user}
                />
              )
            })}
          </Fragment>
        ) : ''}
      </Fragment>
    )
  }
}

export default CardNameSearch
