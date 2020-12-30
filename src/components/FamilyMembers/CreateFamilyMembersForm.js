import React from 'react'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'

const CreateFamilyMembersForm = ({ familyMember, handleSubmit, handleChange, cancelPath }) => (
  <div className="create-form">
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="exampleForm.ControlTextArea1">
        <h4>Create a new family member!</h4><br/>
        <Form.Label>Family member name</Form.Label>
        <Form.Control as="textarea" rows="1" value={familyMember.name} name='name' onChange={handleChange}/>
        {/* I need a field to add gift links */}
      </Form.Group>
      <button type='submit'>Submit</button>
      <Link to='/familyMembers'>
        <button>Cancel</button>
      </Link><br/>
    </Form>
  </div>
)
export default CreateFamilyMembersForm
