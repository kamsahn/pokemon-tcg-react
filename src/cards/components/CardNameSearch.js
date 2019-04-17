import React, { Component, Fragment } from 'react'
import { getCardsByName } from '../api'
import messages from '../messages'
import { store } from '../../store'
import Card from './Card'
import Form, { Control } from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

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
      <div className="flex-col-center my-3">
        <Form onSubmit={this.handleSubmit}>
          <div className="flex-row-center">
            <Control onChange={this.handleChange} type='text' name='name' placeholder='e.g. Dunsparce'/>
            <Button className="mx-3 get-cards" variant="info" type='submit'>Get Cards</Button>
          </div>
        </Form>

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
      </div>
    )
  }
}

export default CardNameSearch
