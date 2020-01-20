import React from 'react'
import MessageItem from '../MessageItem'

class MessageRecord extends React.Component {
  render() {
    console.log(this.props.messageList)
    const ChattingList = this.props.messageList.map((item, index) => {
      return <MessageItem key={index} data={item} myData={this.props.myData} />
    })
    return (
      <div
        style={{
          backgroundColor: '#fff',
          overflow: 'auto',
          height: 'calc(100vh - 150px)',
        }}
      >
        {ChattingList}
      </div>
    )
  }
}

export default MessageRecord
