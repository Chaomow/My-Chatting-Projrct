import React from 'react'
import ConnectTo from '../../ConnectTo'
import {
  Form,
  Input,
  Button,
  Tooltip,
  Icon,
  // DatePicker,
  Select,
  Radio,
  message,
} from 'antd'

import 'antd/dist/antd.css'
import './styles/Register.css'

class Register extends React.Component {
  state = {
    data: { prefixSelector: '886' },
  }
  componentDidMount() {
    if (!!this.props.myData.data)
      this.setState({
        data: {
          ...this.props.myData.data,
        },
      })
  }

  onChange = (item, event) => {
    const value = event?.target ? event?.target?.value : event
    this.setState(prevState => ({
      data: {
        ...prevState.data,
        [item]: value,
      },
    }))
  }

  onSubmit = event => {
    event.preventDefault()
    if (
      !(
        !!this.state.data.email &&
        !!this.state.data.password &&
        !!this.state.data.name &&
        !!this.state.data.gender &&
        !!this.state.data.prefixSelector &&
        !!this.state.data.phoneNumber
      )
    ) {
      message.error('Oops! Something is missing. Check it again!')
    } else {
      const userData = {
        online: true,
        email: this.state.data.email,
        password: this.state.data.password,
        name: this.state.data.name,
        gender: this.state.data.gender,
        // birth: this.state.data.birth,
        prefixSelector: this.state.data.prefixSelector,
        phoneNumber: this.state.data.phoneNumber,
      }
      if (!!this.props.myData.myLogin) {
        //update
        ConnectTo.UpdateUser(this.state.data.email, userData)
        this.props.LoginState(true, userData)
        this.props.offUpdateModal()
        message.success('Your infomation are updated successfully!')
      } else {
        //add
        ConnectTo.FindByEmail(this.state.data.email).then(response => {
          if (!!response.data) {
            message.error("You can't use this email. Try again!")
          } else {
            ConnectTo.AddAnUser(userData)
            this.onClear()
            this.props.LoginState(true, userData)
            message.success("You've done successfully!")
          }
        })
      }
    }
  }

  onClear = () => {
    this.setState({
      data: { prefixSelector: '886' },
    })
  }

  render() {
    const { data } = this.state
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
    const formEmail = !this.props.myData.myLogin ? (
      <Form.Item label="E-mail">
        <Input
          value={data.email}
          onChange={this.onChange.bind(this, 'email')}
        />
      </Form.Item>
    ) : (
      ''
    )
    return (
      <Form
        {...formItemLayout}
        className="register"
        // onSubmit={this.onSubmit}
      >
        {formEmail}
        <Form.Item label="password">
          <Input.Password
            value={data.password}
            onChange={this.onChange.bind(this, 'password')}
          />
        </Form.Item>
        <Form.Item label="Confirm Password">
          <Input.Password
            value={data.confirmPassword}
            onChange={this.onChange.bind(this, 'confirmPassword')}
          />
        </Form.Item>
        <Form.Item
          label={
            <span>
              Name&nbsp;
              <Tooltip title="What do you want others to call you?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          <Input
            value={data.name}
            onChange={this.onChange.bind(this, 'name')}
          />
        </Form.Item>
        <Form.Item label="Gender">
          <Radio.Group
            value={data.gender}
            onChange={this.onChange.bind(this, 'gender')}
          >
            <Radio value="male">Male</Radio>
            <Radio value="female">Female</Radio>
            <Radio value="notSure">Not sure</Radio>
          </Radio.Group>
        </Form.Item>
        {/* <Form.Item label="Birth">
          <DatePicker
            value={data.birth}
            onChange={this.onChange.bind(this, 'birth')}
          />
        </Form.Item> */}
        <Form.Item label="Phone Number">
          <Input
            value={data.phoneNumber}
            onChange={this.onChange.bind(this, 'phoneNumber')}
            addonBefore={
              <Select
                value={data.prefixSelector}
                onChange={this.onChange.bind(this, 'prefixSelector')}
              >
                <Select.Option value="886">+886</Select.Option>
                <Select.Option value="86">+86</Select.Option>
              </Select>
            }
          />
        </Form.Item>
        <Button
          type="primary"
          // htmlType="submit"
          onClick={this.onSubmit}
        >
          {this.props.myData.myLogin ? 'Submit' : 'Register'}
        </Button>
        <Button type="default" onClick={this.onClear}>
          Clear
        </Button>
      </Form>
    )
  }
}

export default Register
