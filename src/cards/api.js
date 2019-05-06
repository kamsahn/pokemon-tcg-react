import pokemon from 'pokemontcgsdk'
import axios from 'axios'
import apiUrl from '../apiConfig'

export const getCardsBySet = (id) => (
  pokemon.card.where({ setCode: id })
)

export const advSearchPokemon = (setCode, types, supertype) => (
  pokemon.card.where({ setCode, types, supertype })
)

export const advSearchTrainer = (setCode, supertype) => (
  pokemon.card.where({ setCode, supertype })
)

export const getCardsByName = (name) => (
  pokemon.card.where({ name })
)

export const cardCreate = (user, card) => (
  axios({
    url: `${apiUrl}/cards`,
    method: 'post',
    headers: {
      Authorization: 'Token token=' + user.token
    },
    data: card
  })
)

export const cardDelete = (user, id) => (
  axios({
    url: `${apiUrl}/cards/${id}`,
    method: 'delete',
    headers: {
      Authorization: 'Token token=' + user.token
    }
  })
)
