import React, { Component } from 'react'
import apiUrl from '../../apiConfig'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

// make sure you make the form component we need for this component
import CreateFamilyMembersForm from './CreateFamilyMembersForm'
import messages from '../AutoDismissAlert/messages'

class FamilyMembersCreate extends Component {
  constructor (props) {
    super(props)

    this.state = {
      familyMember: {
        name: '',
        gifts: []
      },
      createdId: null,
      edited: false
    }
  }

  handleChange = event => {
    event.persist()
    this.setState(prevState => {
      const updatedField = { [event.target.name]: event.target.value }

      const editedFamilyMember = Object.assign({}, prevState.familyMember, updatedField)
      return { familyMember: editedFamilyMember }
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    const { msgAlert } = this.props
    const { familyMember } = this.state

    axios({
      url: `${apiUrl}/familyMembers`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      },
      data: { familyMember: this.state.familyMember }
    })
    //   May run into bug with _id versus id
      .then(res => this.setState({ createdId: res.data.familyMember._id }))
      .then(() => this.setState({ edited: true }))
      .then(() => msgAlert({
        //   make sure you add this message to where message alerts are coming from
        heading: `Added ${familyMember.name} to family list successfully!`,
        message: messages.addToFamilySuccess,
        variant: 'success'
      }))
      .catch(console.error)
  }

  render () {
    const { familyMember, createdId, edited } = this.state
    const { handleChange, handleSubmit } = this

    if (createdId !== null) {
      return <Redirect to={`familyMembers/${createdId}`} />
      //   need to double check that I need the else if that follows
    } else if (edited) {
      return <Redirect to={{ pathname: '/familyMembers' }} />
    }

    return (
      <div className='create-page'>
        <CreateFamilyMembersForm
          familyMember={familyMember}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          cancelPath='/familyMembers'
        />
      </div>
    )
  }
}

// running into unounted component error. may be fixed once i have an index component
export default FamilyMembersCreate
