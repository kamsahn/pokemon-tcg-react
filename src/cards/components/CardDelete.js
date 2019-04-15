import React, { Component, Fragment } from 'react'
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
      <Fragment>
        <p>Are you sure you want to remove {card.name} from your deck?</p>
        <Form onSubmit={this.handleDelete}>
          <Label>Yes, I am sure</Label>
          <Button className="my-2" variant="danger" type="submit">Remove</Button>
        </Form>
        <Form>
          <Label>No, take me back</Label>
          <Link className="btn btn-info" to={'/decks'}>Back</Link>
        </Form>
      </Fragment>
    )
  }
}

export default withRouter(CardDelete)
