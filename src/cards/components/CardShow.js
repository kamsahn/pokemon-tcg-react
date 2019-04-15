import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import Form, { Control, Label } from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import messages from '../messages'
import { cardCreate } from '../api'

class CardShow extends Component {
  constructor () {
    super()

    this.state = {
      card: {
        name: '',
        deck: ''
      }
    }
  }

  componentDidMount () {
    this.setState({ card: this.props.location.state.card })
  }

  handleSubmit = event => {
    event.preventDefault()
    const { user, alert } = this.props
    const { card } = this.state
    cardCreate(user, this.state)
      .then(() => {
        alert(messages.cardCreateSuccess, 'success')
        this.setState({ card: { ...card, deck: '' } })
      })
      .catch(() => alert(messages.cardCreateFailure, 'danger'))
  }

  handleChange = event => {
    this.setState({ card: {
      ...this.state.card, [event.target.name]: event.target.value
    } })
  }

  render () {
    const { card } = this.state

    if (!card) {
      return <p>loading card...</p>
    }

    return (
      <Fragment>
        <img src={card.image}/>
        <Form onSubmit={this.handleSubmit}>
          <Label htmlFor="card">Deck ID: </Label>
          <Control value={card.deck} name="deck" onChange={this.handleChange} placeholer='enter deck id'/>

          <Button variant="info" type="submit">Submit</Button>
        </Form>
      </Fragment>
    )
  }
}

export default withRouter(CardShow)
