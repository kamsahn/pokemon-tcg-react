import pokemon from 'pokemontcgsdk'

export const getCardsBySet = (id) => (
  pokemon.card.where({ setCode: id })
)

export const getCardsByName = (name) => (
  pokemon.card.where({ name })
)
