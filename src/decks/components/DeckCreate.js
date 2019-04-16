import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import DeckForms from './DeckForms'
import { deckCreate } from '../api'
import messages from '../messages'

class DeckCreate extends Component {
  constructor () {
    super()

    this.state = {
      deck: {
        title: ''
      }
    }
  }

  handleChange = event => {
    this.setState({ deck: {
      ...this.state.deck, [event.target.name]: event.target.value
    } })
  }

  handleSubmit = event => {
    event.preventDefault()
    const { user, alert } = this.props
    deckCreate(this.state, user)
      .then(res => {
        this.setState({ deck: res.data.deck, redirect: true })
      })
      .catch(() => {
        this.setState({ deck: { title: '' } })
        alert(messages.deckCreateFailure, 'danger')
      })
  }

  render () {
    if (this.state.redirect) {
      return <Redirect to={`decks/${this.state.deck.id}`}/>
    }

    const { title } = this.state.deck
    return (
      <DeckForms
        deck={title}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    )
  }
}

export default withRouter(DeckCreate)
