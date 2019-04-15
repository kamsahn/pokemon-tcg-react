import React, { Component, Fragment } from 'react'
import { getCardsByName } from '../api'
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
    getCardsByName(this.state.name)
      .on('data', res => {
        if (setCodes.includes(res.setCode)) {
          this.setState({ cards: [...this.state.cards, { card: res }] })
        }
      })
  }

  handleChange = event => {
    this.setState({ name: event.target.value })
  }

  render () {
    const { cards } = this.state
    let counter = 0

    return (
      <Fragment>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} type='text' name='name' placeholder='e.g. Dunsparce'/>
          <input className="btn btn-info mx-3" type='submit' value='Get Card'/>
        </form>
        {cards ? (
          <Fragment>
            {cards.map(item => {
              counter++
              return (
                <Card
                  key={item.card.id + counter.toString()}
                  image={item.card.imageUrl}
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
