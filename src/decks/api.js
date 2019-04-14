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

export const deckShow = (user, id) => (
  axios({
    url: `${apiUrl}/decks/${id}`,
    method: 'get',
    headers: {
      Authorization: 'Token token=' + user.token
    }
  })
)

export const deckCreate = (data, user) => (
  axios({
    url: `${apiUrl}/decks`,
    method: 'post',
    headers: {
      Authorization: 'Token token=' + user.token
    },
    data: data
  })
)

export const deckUpdate = (data, user) => (
  axios({
    url: `${apiUrl}/decks/${data.deck.id}`,
    method: 'patch',
    headers: {
      Authorization: 'Token token=' + user.token
    },
    data: data
  })
)
