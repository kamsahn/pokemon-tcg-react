import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class CardShow extends Component {
  constructor () {
    super()

    this.state = {
      card: null
    }
  }

  componentDidMount () {
    this.setState({ card: this.props.location.state.card })
  }

  render () {
    const { card } = this.state

    if (!card) {
      return <p>loading card...</p>
    }

    return (
      <img src={card.image}/>
    )
  }
}

export default withRouter(CardShow)
