import React from 'react'
import MessageItem from '../MessageItem'

class MessageRecord extends React.Component {
  componentDidMount() {
    this.scrollToBottom()
  }

  componentDidUpdate() {
    this.scrollToBottom()
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: 'auto' })
  }

  render() {
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
        onScroll={this.onScroll}
      >
        {ChattingList}
        <div
          ref={el => {
            this.messagesEnd = el
          }}
        ></div>
      </div>
    )
  }
}

export default MessageRecord
