import React, { Component } from 'react';
import './App.css';
import Players from './components/players'

class App extends Component {

  state = {
      players:[]
  }

  componentDidMount() {
    fetch('http://localhost:8080/players')
    .then(res=>res.json())
    .then((data) => {
      this.setState({players: data})
    })
    .catch(console.log)
  }

  render() {
    return (
      <Players players={this.state.players} />
    );
  }
}

export default App;
