import React from 'react'
import ConnectTo from '../../ConnectTo'
import { Input, Button } from 'antd'

class UserInput extends React.Component {
  state = {
    data: {
      myWord: '',
    },
  }

  onChange = event => {
    this.setState({
      data: {
        myWord: event.target.value,
      },
    })
  }

  onPressEnter = event => {
    event.preventDefault()

    const userInput = {
      fromEmail: this.props.myData.data.email,
      toEmail: this.props.whoITalk.email,
      fromName: this.props.myData.data.name,
      toName: this.props.whoITalk.name,
      message: this.state.data.myWord,
      read: false,
    }
    ConnectTo.AddMessage(userInput)
    this.setState({
      data: {
        myWord: '',
      },
    })
  }

  render() {
    return (
      <div>
        <Input.TextArea
          value={this.state.data.myWord}
          onPressEnter={this.onPressEnter}
          onChange={this.onChange}
          className="UserInput"
        />
        <Button className="UserButton" onClick={this.onPressEnter}>
          Send
        </Button>
      </div>
    )
  }
}
export default UserInput
