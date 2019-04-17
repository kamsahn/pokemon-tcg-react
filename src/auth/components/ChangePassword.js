import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { changePassword } from '../api'
import messages from '../messages'

import Form, { Label, Control } from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class ChangePassword extends Component {
  constructor () {
    super()

    this.state = {
      oldPassword: '',
      newPassword: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onChangePassword = event => {
    event.preventDefault()

    const { alert, history, user } = this.props

    changePassword(this.state, user)
      .then(() => alert(messages.changePasswordSuccess, 'success'))
      .then(() => history.push('/'))
      .catch(error => {
        console.error(error)
        this.setState({ oldPassword: '', newPassword: '' })
        alert(messages.changePasswordFailure, 'danger')
      })
  }

  render () {
    const { oldPassword, newPassword } = this.state

    return (
      <Form className='auth-form' onSubmit={this.onChangePassword}>
        <h3>Change Password</h3>

        <Label htmlFor="oldpw">Old Password</Label>
        <Control
          required
          name="oldPassword"
          value={oldPassword}
          type="password"
          placeholder="Old Password"
          onChange={this.handleChange}
        />
        <Label htmlFor="newPassword">New Password</Label>
        <Control
          required
          name="newPassword"
          value={newPassword}
          type="password"
          placeholder="New Password"
          onChange={this.handleChange}
        />
        <Button variant="primary" type="submit">Change Password</Button>
      </Form>
    )
  }
}

export default withRouter(ChangePassword)
