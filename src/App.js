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
import CardShow from './cards/components/CardShow'
import CardDelete from './cards/components/CardDelete'

import DeckIndex from './decks/components/DeckIndex'
import DeckShow from './decks/components/DeckShow'
import DeckUpdate from './decks/components/DeckUpdate'
import DeckCreate from './decks/components/DeckCreate'
import DeckDelete from './decks/components/DeckDelete'

import { AlertList } from 'react-bs-notifier'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      alerts: [],
      timeout: 2500,
      position: ''
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  alert = (message, type, headline = '', timeout = 2500) => {
    const newAlert = { id: (new Date()).getTime(), type, message }
    this.setState(prevState => ({ alerts: [...prevState.alerts, newAlert] }), () => {
      setTimeout(() => {
        const i = this.state.alerts.indexOf(newAlert)
        if (i >= 0) {
          this.setState(prevState => ({
            // Remove the alert from the array
            alerts: [...prevState.alerts.slice(0, i), ...prevState.alerts.slice(i + 1)]
          }))
        }
      }, timeout)
    })
  }

  render () {
    const { alerts, user, timeout, position } = this.state

    return (
      <React.Fragment>
        <Header user={user} />
        <AlertList
          position={position}
          alerts={alerts}
          timeout={timeout} />
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
          <AuthenticatedRoute user={user} exact path='/card-show' render={() => (
            <CardShow alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/card-delete' render={() => (
            <CardDelete alert={this.alert} user={user} />
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
          <AuthenticatedRoute user={user} exact path='/decks/:id/delete' render={() => (
            <DeckDelete alert={this.alert} user={user} />
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
