import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import apiUrl from '../../apiConfig'
import axios from 'axios'
import messages from '../AutoDismissAlert/messages'

class FamilyMembers extends Component {
  constructor (props) {
    super(props)

    this.state = {
      familyMembers: []
    }
  }

  componentDidMount () {
    const { msgAlert } = this.props

    axios({
      url: (`${apiUrl}/familyMembers`),
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      }
    })
      .then((res) => {
        this.setState({ familyMembers: res.data.familyMembers })
        if (res.data.familyMembers.length === 0) {
          msgAlert({
            heading: 'You have not added any family members yet!',
            message: messages.noFamilyMembers,
            variant: 'danger'
          })
        } else if (res) {
          msgAlert({
            heading: 'Here are all the family members you have added.',
            variant: 'success'
          })
        }
      })
      .catch(console.error)
  }

  render () {
    const familyMembers = this.state.familyMembers.map(familyMember => (
      <Card key={familyMember._id} className='col-sm-4 familyMember'>
        <Card.Title>
          <Link to={`/familyMembers/${familyMember._id}`} className='familyMember-name'>{familyMember.name}</Link>
        </Card.Title>
      </Card>
    ))

    return (
      <div className='container familyMembers-page'>
        <div className='row'>
          <Link to='/familyMembers-create'><button>Create a family member</button></Link>
        </div>
        <div className='row'>
          {familyMembers}
        </div>
      </div>
    )
  }
}

export default FamilyMembers
