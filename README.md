# Pokemon TCG Deck Builder Front End

![github image](https://i.imgur.com/wTsBind.png)

The PokeDeck Builder app is a deck builder for the Pokemon TCG, specifically generations 1 and 2 (before Wizards of the Coast sold to Nintendo). Users can sign up to CRUD decks with cards from the selected sets of cards. The app is made with React and a mobile-first mind set. This is a simple-to-use app for nostalgic Pokemon card players.

## Links

Deployed Client: https://kamsahn.github.io/pokemon-tcg-react

Deployed API: https://pokemon-deckbuilder.herokuapp.com
*note: nothing should be accessible without authentication via client

API: Repo: https://github.com/kamsahn/pokemon-tcg-express

## Technologies Used

- JavaScript
- React
- CSS/SCSS
- Express
- MongoDB
- Mongoose
- Node

## Unsolved Problems / Future Plans

- [x] Styling and user experience upgrade
- [ ] Deck copying for smaller edits
- [x] Hand draw simulator for testing deck viability
- [x] 60 card deck limit
- [x] 4 of a kind rule for cards (excluding energy cards)
- [x] Win/lose counter for deck resource
- [ ] Have a current deck, making adding cards more seemless
- [ ] Advanced search filters

## The Story

Well before I started development, I sought out a deck builder app for Pokemon TCG (unsuccessfully). Me and my friends were rapidly building, playing and breaking apart new deck concepts. We ran into the problem of not remembering a build that we liked and having to piece it back together on memory. Enter Pokemon TCG deck builder app (working title PokeDeck Builder).

### Planning

There were several initial issues when laying out the app for planning including:

- Where to get the card information from
- How to organize the database
- How to display cards/decks for the user

Through some research, I managed to find an opensource [Pokemon TCG API](https://pokemontcg.io/) that solved my issue of where to find the card information. As for the database, I decided to run with Express, Node and MongoDB. I figured start up time for my backend would be very quick and scalling up for future features would be more seemless. I decided to make some document "relationships" with the Mongoose [populate method](https://mongoosejs.com/docs/populate.html), leveraging SQL functionality in a noSQL database. Finally, I decided to let users search by name or by set to begin with, leaving advanced search filters for later. I wanted cards to be listed out vertically (as to be mobile friendly) and to be easy enough to click into and add to user decks. I decided to use React to quickly and efficiently display information relevent to the current component. I also used React Router to give my SPA a navigational feel for enhanced UX.

### Process

After creating user stories and mapping out my tech stack and database, I started the project in earnest. Early days of development included testing out the 3rd party API. Once I had read through documentation and tested with curl, I moved into creating my back end. Because of my experience with Express and the nature of the framework, it was easy to spin up a skeleton version of my custom API. I made very basic user, deck and card resources, tested them and deployed a beta version. Finally, I moved to the client using React. This being my first project using React, I was sure to be methodical about my approach, but soon found the framework to be very intitive. I found it easy to manage my time with the natural break points of React's components. Once I built and tested a beta client, I deployed and tested for a minimum viable product. Once I was satisfied, I jumped into feature addition, which was particularly exciting as this was an app that I was excited to use.

### Problem Solving

Though the process was largely smooth, it was not without it's issues. I ran into a few snags when talking to two different API's, using a new framework (React), and upgrading my back end part way through development. Whenever the app behaved in error (which happened plenty in develpoment) I would stop progress and try to debug from the root, starting from component mounting and following the life cylce events on the front end or from model to routes on the back end. Reading terminal errors and console error messages typically got me to the root of the problem easily. If that was not enough, Google and Stack Overflow typically yielding good results for strange errors. If all else failed, I had a few senior team members to take questions to, where I could voice my concerns and receive guidance to lead me to a solution. All in all, the parts that went poorly were just as helpful to learning as the parts that went well.

## User Stories

- As a user, I want to view and search cards as a visitor
- As a user, I want to search cards by set or name
- As a user, I want to make an account to store my own decks
- As a user, I want to add cards from the database to my decks
- As a user, I want to be able to edit which cards are in my deck at any given time
- As a user, I want to leave notes on how a deck did in game
- As a user, I want to be able to make copies of a deck to make small changes to it
- As a user, I want to be able to simulate a hand-draw to see if the deck is viable
- As a user, I want the app to recognize deck building rules like only four of a certain card can be part of the same deck

## Wireframe

![github image](https://i.imgur.com/XHTbUoS.jpg)

## Client Screen Shots

![github image](https://i.imgur.com/J00Ab2i.png)

## Front End Installation Guide

The PokeDeck Builder is easy to use and run. Just open up the [client](https://kamsahn.github.io/pokemon-tcg-react) in your favorite web browser and sign in to a unique account to create your own decks. If you want to run locally, fork and clone this repo and through your terminal run `npm install` and then `npm start` to run a local host version.
