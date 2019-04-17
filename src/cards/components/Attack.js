import React from 'react'
import { store } from '../../store'

let c = 0

const Attack = ({ attack }) => (
  <div className="card-text">
    <hr></hr>
    <p><span className="bold">{attack.name}</span>:</p>
    <p>{attack.text || ''}</p>
    {attack.damage ? <p><span className="bold">Damage</span>: {attack.damage}</p> : ''}
    {attack.cost ? (
      <p><span className="bold">Cost</span>:
        {attack.cost.map(energy => {
          c++
          return (
            <img key={c} className="mx-1" src={store.types.find(obj => obj.type === energy).imageUrl}/>
          )
        })}
      </p>
    ) : ''}
  </div>
)

export default Attack
