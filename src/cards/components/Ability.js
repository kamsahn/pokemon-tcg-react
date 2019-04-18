import React from 'react'

const Ability = ({ ability }) => (
  <div className="card-text">
    <hr></hr>
    <p><span className="bold">{ability.name}</span>:</p>
    <p>{ability.text || ''}</p>
  </div>
)

export default Ability
