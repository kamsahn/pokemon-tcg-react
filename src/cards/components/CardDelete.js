import React, { Component } from 'react'
import { withRouter, Link, Redirect } from 'react-router-dom'
import Form, { Label } from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { cardDelete } from '../api'
import messages from '../messages'

class CardDelete extends Component {
  constructor () {
    super()

    this.state = {
      card: null
    }
  }

  componentDidMount () {
    this.setState({ card: this.props.location.state.card })
  }

  handleDelete = event => {
    event.preventDefault()
    const { user, alert } = this.props
    const id = this.state.card.id
    cardDelete(user, id)
      .then(() => {
        alert(messages.cardDeleteSuccess, 'success')
        this.setState({ redirect: true })
      })
      .catch(() => alert(messages.cardDeleteFailure, 'danger'))
  }

  render () {
    const { card, redirect } = this.state

    if (redirect) {
      return <Redirect to="/decks"/>
    }

    if (!card) {
      return <p>Loading...</p>
    }

    return (
      <div className="flex-col-center my-3">
        <h5>Are you sure you want to remove {card.name} from your deck?</h5>
        <Form className="my-3" onSubmit={this.handleDelete}>
          <Label>Yes, I am sure</Label>
          <Button className="m-2" variant="danger" type="submit">Remove</Button>
        </Form>
        <Form>
          <Label>No, take me back</Label>
          <Link className="btn btn-primary m-2" to={'/decks'}>Back</Link>
        </Form>
      </div>
    )
  }
}

export default withRouter(CardDelete)
