import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import DeckForms from './DeckForms'
import { deckCreate } from '../api'

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
    const { user } = this.props
    deckCreate(this.state, user)
      .then(console.log)
      .catch(console.error)
  }

  render () {
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
