import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
// import Dropdown from 'react-bootstrap/Dropdown'
// import DropdownButton from 'react-bootstrap/DropdownButton'

import './Header.scss'

const authenticatedOptions = (
  <Fragment>
    <Link to="/change-password">Change Password</Link>
    <Link to="/sign-out">Sign Out</Link>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <Link to="/sign-up">Sign Up</Link>
    <Link to="/sign-in">Sign In</Link>
  </Fragment>
)

const myDecks = (
  <Fragment>
    <Link to="/decks">My Decks</Link>
  </Fragment>
)

const searchOptions = (
  <Fragment>
    <Link to='/search-name'>Search By Name</Link>
    <Link to='/search-set'>Search By Set</Link>
  </Fragment>
)

const Header = ({ user }) => (
  <header className="main-header">
    <Link to="/"><h1 className="home-link">PokeDeck Builder</h1></Link>
    <nav>
      { searchOptions }
      { user && myDecks }
      { user ? authenticatedOptions : unauthenticatedOptions}
    </nav>
  </header>
)

export default Header
