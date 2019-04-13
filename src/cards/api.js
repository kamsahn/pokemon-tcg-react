// import axios from 'axios'
import pokemon from 'pokemontcgsdk'
// import { store } from '../store'

// const sortedCards = cards => cards.sort((a, b) => a.number - b.number)

// const sort = (response) => {
//   store.cards.push(response)
//   if (store.cards.length === 102) {
//     store.cards = sortedCards(store.cards)
//   }
// }

export const getCardsBySet = (id) => (
  pokemon.card.all({ setCode: id })
  // .on('data', sort)
)

export const getCardsByName = (name) => (
  pokemon.card.all({ name })
)
