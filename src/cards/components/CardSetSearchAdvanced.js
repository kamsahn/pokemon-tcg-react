import React, { Fragment } from 'react'

const CardSetSearchAdvanced = (
  { handleChangeSupertype, handleChangeTypes, supertype }
) => (
  <Fragment>
    <select className="btn drop-search" onChange={handleChangeSupertype}>
      <option value="">--Choose a card type--</option>
      <option value="Pokémon">Pokemon</option>
      <option value="Trainer">Trainer</option>
    </select>
    {supertype === 'Pokémon' ? (
      <select className="btn drop-search" onChange={handleChangeTypes}>
        <option value="">--Choose a pokemon type--</option>
        <option value="Colorless">Colorless</option>
        <option value="Darkness">Darkness</option>
        <option value="Fighting">Fighting</option>
        <option value="Fire">Fire</option>
        <option value="Grass">Grass</option>
        <option value="Lightning">Lightning</option>
        <option value="Metal">Metal</option>
        <option value="Psychic">Psychic</option>
        <option value="Water">Water</option>
      </select>
    ) : ('')}
  </Fragment>
)

export default CardSetSearchAdvanced
