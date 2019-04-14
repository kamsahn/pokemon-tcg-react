import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import DeckForms from './DeckForms'
import { deckShow, deckUpdate } from '../api'
import messages from '../messages'

class DeckUpdate extends Component {
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

  handleChange = event => {
    this.setState({ deck: {
      ...this.state.deck, [event.target.name]: event.target.value
    } })
  }

  handleSubmit = event => {
    event.preventDefault()
    const { user, alert } = this.props
    deckUpdate(this.state, user)
      .then(res => this.setState({ redirect: true }))
      .catch(() => alert(messages.deckUpdateFailure, 'danger'))
  }

  render () {
    if (this.state.redirect) {
      // const id = this.props.match.params.id
      return <Redirect to='/decks'/>
    }

    if (!this.state.deck) {
      return <p>Loading deck...</p>
    }

    const { title } = this.state.deck
    return (
      <DeckForms
        title={title}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    )
  }
}

export default withRouter(DeckUpdate)
