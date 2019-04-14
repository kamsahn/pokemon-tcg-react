import React, { Fragment } from 'react'

const DeckForms = (
  { title, handleSubmit, handleChange }
) => (
  <Fragment>
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title: </label>
      <input value={title} name="title" onChange={handleChange} placeholer='enter deck title'/>

      <button type="submit">Submit</button>
    </form>
  </Fragment>
)

export default DeckForms
