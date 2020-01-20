import React from 'react'
import ConnectTo from '../../ConnectTo'
import Register from '../../LoginPage/Register'

import { Popconfirm, Icon, /*Switch,*/ Modal, message } from 'antd'

class HeaderBar extends React.Component {
  state = {
    visible: false,
  }

  // changeOnline = event => {
  // }

  confirm = e => {
    message.success('Bye Bye!')
    this.props.LoginState(false, null)
    ConnectTo.LoginState(this.props.myData.data.email, false)
  }

  showModal = () => {
    message.info(
      'If you are not going to change your password. Just leave blank.',
    )
    this.setState({
      visible: true,
    })
  }

  handleCancel = event => {
    this.setState({
      visible: false,
    })
  }

  render() {
    return (
      <div>
        {/* <Switch
          style={{ float: 'left', margin: '15px' }}
          checkedChildren={<Icon type="smile" />}
          unCheckedChildren={<Icon type="meh" />}
          onChange={this.changeOnline}
          defaultChecked
        /> */}
        <div className="myTitle">
          <Icon type="rocket" theme="twoTone" />
          {this.props.myData.myTitle}
        </div>
        <Icon
          className="headerList"
          type="setting"
          theme="filled"
          onClick={this.showModal}
        />
        <Modal
          title="My Information"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
        >
          <Register
            myData={this.props.myData}
            LoginState={this.props.LoginState}
            offUpdateModal={this.handleCancel}
          />
        </Modal>
        <Popconfirm
          title="Log out?"
          onConfirm={this.confirm}
          onCancel={this.cancel}
          okText="Yes"
          cancelText="No"
          style={{ height: '50px' }}
        >
          <Icon className="headerList" type="poweroff" />
        </Popconfirm>
      </div>
    )
  }
}

export default HeaderBar
