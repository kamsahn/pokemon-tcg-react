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
    const { deck } = this.state
    deckUpdate(this.state, user)
      .then(res => this.setState({ redirect: true }))
      .catch(() => {
        alert(messages.deckUpdateFailure, 'danger')
        this.setState({ deck: { ...deck, title: '' } })
      })
  }

  addOneWin = () => this.setState(prevState => {
    const { deck } = this.state
    return { deck: { ...deck, wins: prevState.deck.wins + 1 } }
  })

  addOneLoss = () => this.setState(prevState => {
    const { deck } = this.state
    return { deck: { ...deck, loses: prevState.deck.loses + 1 } }
  })

  render () {
    if (this.state.redirect) {
      return <Redirect to='/decks'/>
    }

    if (!this.state.deck) {
      return <p>Loading deck...</p>
    }

    const { deck } = this.state
    return (
      <DeckForms
        title={deck.title}
        wins={deck.wins}
        loses={deck.loses}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        addOneWin={this.addOneWin}
        addOneLoss={this.addOneLoss}
      />
    )
  }
}

export default withRouter(DeckUpdate)
