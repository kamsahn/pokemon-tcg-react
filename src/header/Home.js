import React from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'

const Home = () => (
  <Jumbotron className='my-3'>
    <h1>Welcome to the Pokemon TCG Deck Builder!</h1>
    <p>
      This is an easy-to-use app for building Pokemon Card decks, specifically
      from the Wizards of the Coast sets. As a visitor, you can browse cards from
      the sets or by name. Sign in to create decks that you can store here and
      access later.
    </p>
    <hr></hr>
    <p>
      This app is not associated with Wizards of the Coast, Nintendo, or The
      Pokemon company.
    </p>
  </Jumbotron>
)

export default Home
