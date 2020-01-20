import React from 'react'

class MessageItem extends React.Component {
  addZero = i => {
    if (i < 10) {
      i = '0' + i
    }
    return i
  }
  render() {
    const data = this.props.data
    const time = new Date(data.time)
    return (
      <div>
        <div
          className={`chatField ${
            data.fromEmail === this.props.myData.data.email ? 'fromMe' : ''
          }`}
        >
          <div>{data.fromName}</div>
          <div>{data.message}</div>
          <div>{`${this.addZero(time.getHours())}:${this.addZero(
            time.getMinutes(),
          )}`}</div>
        </div>
      </div>
    )
  }
}

export default MessageItem
