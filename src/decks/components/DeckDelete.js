import React, { Component } from 'react'
import { withRouter, Link, Redirect } from 'react-router-dom'
import { deckDelete } from '../api'
import messages from '../messages'
import Form, { Label } from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class DeckDelete extends Component {
  constructor () {
    super()

    this.state = {
      deck: null
    }
  }

  componentDidMount () {
    this.setState({ deck: this.props.location.state.deck })
  }

  handleDelete = event => {
    event.preventDefault()
    const { user, alert } = this.props
    const id = this.props.match.params.id
    deckDelete(user, id)
      .then(() => {
        alert(messages.deckDeleteSuccess, 'success')
        this.setState({ redirect: true })
      })
      .catch(() => alert(messages.deckDeleteFailure, 'danger'))
  }

  render () {
    const { deck, redirect } = this.state

    if (redirect) {
      return <Redirect to='/decks'/>
    }

    if (!deck) {
      return <p>Loading deck...</p>
    }

    return (
      <div className="flex-col-center my-3">
        <h5>Are you sure you want to delete {deck.title}?</h5>
        <Form className="my-3" onSubmit={this.handleDelete}>
          <Label>Yes, I am sure.</Label>
          <Button className="m-2" variant="danger" type="submit">Delete</Button>
        </Form>
        <Form>
          <Label>No, take me back.</Label>
          <Link className="btn btn-info m-2" to={'/decks'}>Back</Link>
        </Form>
      </div>
    )
  }
}

export default withRouter(DeckDelete)
