import axios from 'axios'

const ConnectTo = {
  Login: (email, password) => {
    return axios
      .get(`http://localhost:4000/users/Login/${email}/${password}`)
      .catch(function(error) {
        console.log(error)
      })
  },
  FindByEmail: email => {
    return axios
      .get(`http://localhost:4000/users/findByEmail/${email}`)
      .catch(function(error) {
        console.log(error)
      })
  },
  AddAnUser: newUser => {
    return axios
      .post('http://localhost:4000/users/add', newUser)
      .catch(function(error) {
        console.log(error)
      })
  },
  AddAFriend: (email, friend) => {
    return axios
      .post(`http://localhost:4000/users/addFriend/${email}`, friend)
      .catch(function(error) {
        console.log(error)
      })
  },
  UpdateUser: (email, data) => {
    return axios
      .post(`http://localhost:4000/users/update/${email}`, data)
      .catch(function(error) {
        console.log(error)
      })
  },
  AddMessage: newMessage => {
    return axios
      .post(`http://localhost:4000/message/add`, newMessage)
      .catch(function(error) {
        console.log(error)
      })
  },
  findMessageByEmail: (fromEmail, toEmail) => {
    return axios
      .get(
        `http://localhost:4000/message/findMessageByEmail/${fromEmail}/${toEmail}`,
      )
      .catch(function(error) {
        console.log(error)
      })
  },
  LoginState: (email, state) => {
    return axios
      .post(`http://localhost:4000/users/loginState/${email}`, {
        online: state,
      })
      .catch(function(error) {
        console.log(error)
      })
  },
}

export default ConnectTo
