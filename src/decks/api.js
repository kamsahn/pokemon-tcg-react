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
