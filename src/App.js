import React, { Component } from 'react'
import './App.scss'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import Header from './header/Header'
import SignUp from './auth/components/SignUp'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
import ChangePassword from './auth/components/ChangePassword'
import Home from './header/Home'
import CardSetSearch from './cards/components/CardSetSearch'
import CardNameSearch from './cards/components/CardNameSearch'
import DeckIndex from './decks/components/DeckIndex'
import DeckShow from './decks/components/DeckShow'
import DeckUpdate from './decks/components/DeckUpdate'
import DeckCreate from './decks/components/DeckCreate'

import Alert from 'react-bootstrap/Alert'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      alerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  alert = (message, type) => {
    this.setState({ alerts: [...this.state.alerts, { message, type }] })
  }

  render () {
    const { alerts, user } = this.state

    return (
      <React.Fragment>
        <Header user={user} />
        {alerts.map((alert, index) => (
          <Alert key={index} dismissible variant={alert.type}>
            <Alert.Heading>
              {alert.message}
            </Alert.Heading>
          </Alert>
        ))}
        <main className="container">
          <Route exact path='/sign-up' render={() => (
            <SignUp alert={this.alert} setUser={this.setUser} />
          )} />
          <Route exact path='/sign-in' render={() => (
            <SignIn alert={this.alert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} exact path='/sign-out' render={() => (
            <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/change-password' render={() => (
            <ChangePassword alert={this.alert} user={user} />
          )} />
          <Route exact path='/' component={Home}/>
          <Route exact path='/search-set' render={() => (
            <CardSetSearch alert={this.alert} user={user} />
          )} />
          <Route exact path='/search-name' render={() => (
            <CardNameSearch alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/decks' render={() => (
            <DeckIndex alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/decks/:id' render={() => (
            <DeckShow alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/decks/:id/edit' render={() => (
            <DeckUpdate alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/decks-new' render={() => (
            <DeckCreate alert={this.alert} user={user} />
          )} />
        </main>
      </React.Fragment>
    )
  }
}

export default App
