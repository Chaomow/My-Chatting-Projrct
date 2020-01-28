import React from 'react'
import AddFriend from '../AddFriend'
import ConnectTo from '../../ConnectTo'
import { Menu /*, Badge*/ } from 'antd'

class MessagerList extends React.Component {
  state = {
    myData: this.props.myData,
  }

  onClick = (name, email, event) => {
    this.props.whoImTalking({ name: name, email: email })
  }

  reRender = () => {
    setTimeout(
      function() {
        ConnectTo.FindByEmail(this.state.myData.data.email).then(response => {
          this.setState({
            ...this.state,
            myData: {
              ...this.state.myData,
              data: {
                ...this.state.myData.data,
                friend: response.data.friend,
              },
            },
          })
        })
      }.bind(this),
      500,
    )
  }

  render() {
    const namesList = !!this.state.myData.data.friend
      ? this.state.myData.data.friend.map((user, index) => {
          return (
            <Menu.Item
              key={index}
              onClick={this.onClick.bind(this, user.name, user.email)}
            >
              {user.name}
              {/* <Badge
                count={user.read}
                style={{ position: 'absolute', top: '-15px', right: '-30px' }}
              /> */}
            </Menu.Item>
          )
        })
      : ''

    const myData = {
      ...this.state.myData,
      reRender: this.reRender,
    }
    return (
      <div>
        <AddFriend myData={myData} />
        <Menu onClick={this.handleClick} mode="inline">
          <Menu.Item
            key="Public"
            onClick={this.onClick.bind(this, 'PublicRoom', 'PublicRoom')}
          >
            Public Room
          </Menu.Item>
          {namesList}
        </Menu>
      </div>
    )
  }
}

export default MessagerList
