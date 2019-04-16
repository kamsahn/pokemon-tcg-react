import React from 'react'
import { store } from '../../store'

let c = 0

const Attack = ({ attack }) => (
  <div>
    <p>{attack.name}:</p>
    <p>{attack.text || ''}</p>
    {attack.damage ? <p>Damage: {attack.damage}</p> : ''}
    {attack.cost ? (
      attack.cost.map(energy => {
        c++
        return (
          <p key={c}>Cost:
            <img src={store.types.find(obj => obj.type === energy).imageUrl}/>
          </p>
        )
      })
    ) : ''}
  </div>
)

export default Attack
