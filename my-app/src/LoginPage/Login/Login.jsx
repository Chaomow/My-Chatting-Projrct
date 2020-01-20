import React from 'react'
import ConnectTo from '../../ConnectTo'
import { Form, Input, Button, message } from 'antd'

import 'antd/dist/antd.css'
import './styles/Login.css'

class LoginForm extends React.Component {
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

  render() {
    const { form } = this.props

    // console.log(form.getFieldValue('email'))
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
          {/* {form.getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your email!' }],
          })( */}
          <Input onChange={this.onChange.bind(this, 'email')} />
          {/* )} */}
        </Form.Item>
        <Form.Item label="password">
          {/* {form.getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your password!' }],
          })( */}
          <Input.Password onChange={this.onChange.bind(this, 'password')} />,
          {/* )} */}
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
const Login = Form.create({ name: 'loginForm' })(LoginForm)
export default Login
