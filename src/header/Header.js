import React from 'react'
import { Link } from 'react-router-dom'

import './Header.scss'

const authenticatedOptions = (
  <React.Fragment>
    <Link to="/decks">My Decks</Link>
    <Link to="/change-password">Change Password</Link>
    <Link to="/sign-out">Sign Out</Link>
  </React.Fragment>
)

const unauthenticatedOptions = (
  <React.Fragment>
    <Link to="/sign-up">Sign Up</Link>
    <Link to="/sign-in">Sign In</Link>
  </React.Fragment>
)

// const alwaysOptions = (
//   <React.Fragment>
//     <Link to="/">Home</Link>
//   </React.Fragment>
// )

const searchOptions = (
  <React.Fragment>
    <Link to='/search-name'>Search By Name</Link>
    <Link to='/search-set'>Search By Set</Link>
  </React.Fragment>
)

const Header = ({ user }) => (
  <header className="main-header">
    <Link to="/"><h1 className="home-link">PokeDeck Builder</h1></Link>
    <nav>
      { user && <span>Welcome, {user.email}</span>}
      { searchOptions }
      { user ? authenticatedOptions : unauthenticatedOptions }
    </nav>
  </header>
)

export default Header
