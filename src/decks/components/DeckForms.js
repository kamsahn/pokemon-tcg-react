import React, { Fragment } from 'react'
import Form, { Control, Label } from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const DeckForms = (
  { title, handleSubmit, handleChange }
) => (
  <Fragment>
    <Form onSubmit={handleSubmit}>
      <Label htmlFor="title">Title: </Label>
      <Control value={title} name="title" onChange={handleChange} placeholer='enter deck title'/>

      <Button variant="info" type="submit">Submit</Button>
    </Form>
  </Fragment>
)

export default DeckForms
