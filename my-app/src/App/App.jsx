import React from 'react'
import MyChat from '../MyChat'
// import ConnectTo from '../ConnectTo'
// import { notification } from 'antd'
import LoginPage from '../LoginPage'

import './styles/App.css'
import 'antd/dist/antd.css'
import './styles/myApp.css'

class App extends React.Component {
  state = {
    myLogin: false,
    myTitle: 'My Chatting Project',
  }

  componentDidMount() {
    document.title = this.state.myTitle
  }

  LoginState = (bool, obj) => {
    if (!!obj) {
      const { password, ...rest } = obj
      this.setState({
        myLogin: bool,
        data: rest,
      })
    } else {
      this.setState({
        myLogin: bool,
        data: {},
      })
    }
    // ConnectTo.LoginState(this.state.data.email, bool)
  }

  // openNotificationWithIcon = (type, message, description) => {
  //   notification[type]({ message, description, placement: 'bottomRight' })
  // }

  render() {
    const page = this.state.myLogin ? (
      <MyChat myData={this.state} LoginState={this.LoginState} />
    ) : (
      <LoginPage myData={this.state} LoginState={this.LoginState} />
    )
    return <div className="App">{page}</div>
  }
}

export default App
