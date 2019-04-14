import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
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
      .then(res => {
        console.log(res)
        this.setState({ deck: res.data.deck })
      })
      .catch(() => alert(messages.deckShowFailure, 'danger'))
  }

  render () {
    const { deck } = this.state

    if (!deck) {
      return (
        <p>Loading deck...</p>
      )
    }

    return (
      <Fragment>
        <h4>{deck.title}</h4>
      </Fragment>
    )
  }
}

export default withRouter(DeckShow)
