import React, { Component } from 'react';
import './App.css';
import Players from './components/players'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

class App extends Component {

  state = {
      players:[]
  }

  componentDidMount() {
    fetch('/players')
    .then(res=>res.json())
    .then((data) => {
      this.setState({players: data})
    })
    .catch(console.log)
  }


  
  render() {





    return (
      //<table>

        <Players players={this.state.players} />
      //</table>
    );
  }
}

export default App;
