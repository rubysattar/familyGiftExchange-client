// This is where we wanna be able to index all of the gifts for a family member

// we also wanna be able to see an 'add more gifts' button that pops up a modal form or 'is' a link to a page with a form
// on success, the modal or page should redirect back to that specific family member again (i.e. this component)
// (like view all cards)

// be able to toggle on each gift to indicate if we purchased it or not
// purchased should be a state that can change based on a toggle switch button

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import apiUrl from '../../apiConfig'
import axios from 'axios'
import Card from 'react-bootstrap/Card'
// import messages from '../AutoDismissAlert/messages'

class FamilyMember extends Component {
  constructor (props) {
    super(props)
    this.state = {
      familyMember: {
        name: '',
        gifts: []
      },
      deleted: false,
      updated: false,
      purchased: false
    }
  }

  componentDidMount () {
    const { msgAlert } = this.props

    axios({
      url: `${apiUrl}/familyMembers/${this.props.match.params._id}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      }
    })
      .then(console.log(res => res.data.familyMember))

      .then(res => this.setState({ familyMember: res.data.familyMember }))
      .then(() => msgAlert({
        heading: 'Success!',
        variant: 'success'
      }))
      .catch(error => msgAlert({
        heading: 'Show deck failed' + error.message,
        variant: 'danger'
      }))
      .catch(console.error)
  }

  render () {
    // const gifts = () => {
    //     for (let i = 0; i < this.state.familyMember.gifts) {
    //         // assign each gift to a list item?
    //     }
    // }
    const gifts = this.state.familyMember.gifts.map(gift => (
      <Card key={gift._id} className='col-sm-4 gift'>
        <ul>
          <li>{gift.title}</li>
          <li>{gift.url}</li>
          <li>{gift.comment}</li>
        </ul>
      </Card>
    ))

    return (
      <div className='container' key={this.state.familyMember._id}>
        {/* the above key is potentially buggy */}
        <div className='row'>
          <h4>{this.state.familyMember.name}&apos; gifts</h4>
          <Link to='/gifts-create'><button>Add more gifts</button></Link>
          {/* the above component still needs to be made with a create form */}
        </div>
        <div className='row'>
          {gifts}
          {/* How do i get each individual gift that is displayed to have an update and delete button on its individual card */}
        </div>
      </div>
    )
  }
}

export default FamilyMember
