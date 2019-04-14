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
        <Link to={`${id}/edit`}>edit</Link>
      </Fragment>
    )
  }
}

export default withRouter(DeckShow)
