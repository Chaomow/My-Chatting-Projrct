import React from 'react'
import Login from './Login'
import Register from './Register'
import { Tabs, Layout, Icon } from 'antd'

import 'antd/dist/antd.css'

const { Header, Footer } = Layout
class LoginPage extends React.Component {
  render() {
    return (
      <Layout>
        <Header className="myHeader themeColor">
          <div className="myTitle">
            <Icon type="rocket" theme="twoTone" />
            {this.props.myData.myTitle}
          </div>
        </Header>
        <Layout className="myContent">
          <Tabs defaultActiveKey="1" style={{ overflowY: 'auto' }}>
            <Tabs.TabPane tab="Login" key="Login">
              <Login
                myData={this.props.myData}
                LoginState={this.props.LoginState}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Register" key="Register">
              <Register
                myData={this.props.myData}
                LoginState={this.props.LoginState}
              />
            </Tabs.TabPane>
          </Tabs>
        </Layout>
        <Footer className="myFooter themeColor">
          My Chatting Project ©2020 Created by Wayne Chao
        </Footer>
      </Layout>
    )
  }
}

export default LoginPage
