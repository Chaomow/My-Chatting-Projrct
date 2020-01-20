import React from 'react'
import ConnectTo from '../ConnectTo'
import MessagerList from './MessagerList'
import MessageRecord from './MessageRecord'
import UserInput from './UserInput'
import HeaderBar from './HeaderBar'
import { Layout, Result, Icon } from 'antd'

const { Header, Footer, Sider } = Layout

class MyChat extends React.Component {
  state = {
    whoITalk: {},
    visible: false,
  }

  whoImTalking = talker => {
    const list = []
    ConnectTo.findMessageByEmail(
      this.props.myData.data.email,
      talker.email,
    ).then(response => {
      response.data.forEach(element => {
        list.push(element)
      })
    })
    ConnectTo.findMessageByEmail(
      talker.email,
      this.props.myData.data.email,
    ).then(response => {
      response.data.forEach(element => {
        list.push(element)
      })
    })
    this.setState({
      ...this.state,
      // whoITalk: talker,
      visible: true,
      messageList: list,
    })
  }

  render() {
    const messageArea = this.state.visible ? (
      <Layout className="myContent">
        <MessageRecord
          myData={this.props.myData}
          messageList={this.state.messageList}
          // whoITalk={this.state.whoITalk}
        />
        <UserInput
          myData={this.props.myData}
          // whoITalk={this.state.whoITalk}
        />
      </Layout>
    ) : (
      <Layout className="myContent">
        <Result
          icon={<Icon type="smile" theme="twoTone" />}
          title={`Hello! Welcome back ${this.props.myData.data.name}`}
        />
      </Layout>
    )
    return (
      <Layout>
        <Header className="myHeader themeColor">
          <HeaderBar
            myData={this.props.myData}
            LoginState={this.props.LoginState}
          />
        </Header>
        <Layout>
          <Sider className="mySider themeColor">
            <MessagerList
              myData={this.props.myData}
              whoImTalking={this.whoImTalking}
            />
          </Sider>
          {messageArea}
        </Layout>
        <Footer className="myFooter themeColor">
          My Chatting Project ©2020 Created by Wayne Chao
        </Footer>
      </Layout>
    )
  }
}

export default MyChat
