import React from 'react'
import ConnectTo from '../../ConnectTo'
import { Button, Modal, Input, List, Icon, message } from 'antd'

class AddFriend extends React.Component {
  state = {
    search: '',
    addFriend: false,
    friendData: [],
  }

  showModal = () => {
    this.setState({
      addFriend: true,
    })
  }

  searchFriend = event => {
    if (event === this.props.myData.data.email) {
      message.warning('This is your email!')
    } else {
      ConnectTo.FindByEmail(event).then(response => {
        if (!!response.data) {
          this.setState({
            friendData: [
              {
                name: response.data.name,
                email: response.data.email,
                confirmed: false,
              },
            ],
          })
        } else {
          message.warning("can't find anyone's email")
          this.setState({
            search: '',
            friendData: [],
          })
        }
      })
    }
  }

  onChange = event => {
    this.setState({
      search: event.target.value,
    })
  }

  onClickAdd = event => {
    ConnectTo.FindByEmail(this.props.myData.data.email).then(resault => {
      if (
        resault.data.friend[0] &&
        !!resault.data.friend.filter(value => {
          return value.email === this.state.friendData[0].email
        })[0]
      ) {
        message.warning("You've added this friend already!")
        this.setState({
          search: '',
          friendData: [],
        })
      } else {
        ConnectTo.AddAFriend(
          this.props.myData.data.email,
          this.state.friendData[0],
        )
        message.success("You've added a new friend!")
        this.handleCancel()
        this.props.myData.reRender()
      }
    })
  }

  handleCancel = event => {
    this.setState({
      addFriend: false,
      search: '',
      friendData: [],
    })
  }

  render() {
    return (
      <div>
        <Button
          style={{ width: '100%', height: '50px' }}
          onClick={this.showModal}
        >
          <Icon type="user-add" style={{ fontSize: '30px' }} />
        </Button>
        <Modal
          title="ADD A FRIEND"
          visible={this.state.addFriend}
          onCancel={this.handleCancel}
          footer={null}
        >
          <Input.Search
            placeholder="example@theemail.com"
            onSearch={this.searchFriend}
            onChange={this.onChange}
            value={this.state.search}
            style={{ width: 200 }}
          />
          <List
            size="small"
            dataSource={this.state.friendData}
            renderItem={item => (
              <List.Item
                actions={[<Button onClick={this.onClickAdd}>Add</Button>]}
              >
                <List.Item.Meta title={item.name} description={item.email} />
                {/* <Icon
                  type={item.online ? 'smile' : 'meh'}
                  theme={item.online ? 'twoTone' : ''}
                  twoToneColor={item.online ? '#52c41a' : ''}
                  style={{ marginLeft: '15px' }}
                /> */}
              </List.Item>
            )}
          />
        </Modal>
      </div>
    )
  }
}

export default AddFriend
