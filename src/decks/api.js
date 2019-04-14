import apiUrl from '../apiConfig'
import axios from 'axios'

export const deckIndex = (user) => (
  axios({
    url: `${apiUrl}/decks`,
    method: 'get',
    headers: {
      Authorization: 'Token token=' + user.token
    }
  })
)

export const deckCreate = (deck, user) => (
  axios({
    url: `${apiUrl}/decks`,
    method: 'post',
    headers: {
      Authorization: 'Token token=' + user.token
    },
    data: deck
  })
)
