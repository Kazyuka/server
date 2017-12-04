import React, { Component } from 'react';
import ConstantsList from './Constants';
var axios = require('axios');

class App extends Component {

  constructor(props) {
        super(props);
        this.state = {
            userName: ''
        }
    }
     getAllUserFromServer() {
        axios.get(ConstantsList.GET_ALL_USER)
            .then(function (response) {
                return response;
            })
            .catch(function (error) {
                return "error"
            });
    }
    render() {

    return (
      <div>
          { this.getAllUserFromServer()}
      </div>
    );
  }
}

export default App;
