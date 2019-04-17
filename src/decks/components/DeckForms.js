import React, { Fragment } from 'react'
import Form, { Control, Label } from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const DeckForms = (
  { title, wins, loses, handleSubmit, handleChange }
) => (
  <Form className="auth-form" onSubmit={handleSubmit}>
    <Label htmlFor="title">Title: </Label>
    <Control value={title} name="title" onChange={handleChange} placeholer='enter deck title'/>

    {wins > -1 ? (
      <Fragment>
        <Label htmlFor="wins">Wins: </Label>
        <Control value={wins} name="wins" onChange={handleChange} type="number" min="0"/>
      </Fragment>
    ) : ''}

    {loses > -1 ? (
      <Fragment>
        <Label htmlFor="loses">Loses: </Label>
        <Control value={loses} name="loses" onChange={handleChange} type="number" min="0"/>
      </Fragment>
    ) : ''}
    <Button variant="info" type="submit">Submit</Button>
  </Form>
)

export default DeckForms
