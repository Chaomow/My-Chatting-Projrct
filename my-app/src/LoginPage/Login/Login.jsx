import React from 'react'
import ConnectTo from '../../ConnectTo'
import { Form, Input, Button, message } from 'antd'

import 'antd/dist/antd.css'
import './styles/Login.css'

class Login extends React.Component {
  state = {
    data: {},
  }
  onChange = (item, event) => {
    const { value } = event.target
    this.setState(prevState => ({
      data: {
        ...prevState.data,
        [item]: value,
      },
    }))
  }

  onSubmit = event => {
    if (!this.state.data.email || !this.state.data.password) {
      message.error('Oops! Something is missing. Check it again!')
    } else {
      ConnectTo.Login(this.state.data.email, this.state.data.password).then(
        response => {
          if (!!response.data) {
            this.props.LoginState(true, response.data)
          } else {
            message.error(
              "Can't find any user's information matched with your email!",
            )
          }
        },
      )
    }
  }

  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    }
    return (
      <Form
        {...formItemLayout}
        className="login"
        // onSubmit={this.onSubmit}
      >
        <Form.Item label="E-mail">
          <Input onChange={this.onChange.bind(this, 'email')} />
        </Form.Item>
        <Form.Item label="password">
          <Input.Password onChange={this.onChange.bind(this, 'password')} />
        </Form.Item>
        <Button
          type="primary"
          // htmlType="submit"
          onClick={this.onSubmit}
        >
          Log in
        </Button>
      </Form>
    )
  }
}
export default Login
