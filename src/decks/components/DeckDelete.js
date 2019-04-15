import React, { Component, Fragment } from 'react'
import { withRouter, Link, Redirect } from 'react-router-dom'
import { deckShow, deckDelete } from '../api'
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
    const { user, alert } = this.props
    const id = this.props.match.params.id
    deckShow(user, id)
      .then(res => this.setState({ deck: res.data.deck }))
      .catch(() => alert(messages.deckShowFailure, 'danger'))
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
      <Fragment>
        <p>Are you sure you want to delete {deck.title}?</p>
        <Form onSubmit={this.handleDelete}>
          <Label>Yes, I am sure</Label>
          <Button className="my-2" variant="danger" type="submit">Delete</Button>
        </Form>
        <Form>
          <Label>No, take me back</Label>
          <Link className="btn btn-info" to={'/decks'}>Back</Link>
        </Form>
      </Fragment>
    )
  }
}

export default withRouter(DeckDelete)
