import React, { Component } from 'react';
import './App.css';
//import Players from './components/players'
//import ReactTable from 'react-table'
//import 'react-table/react-table.css'

class App extends Component {

  // state = {
  //     players:[]
  // }

  constructor(props){
    super(props);
    this.state = {
      'players': [],
      isLoaded: false,
    };
  }



  componentDidMount(){
    fetch("/players?")
    .then(res => res.json())
    .then(res => this.setState({'players' : res}))
  }
  
  render() {
    console.log(this.state.players);
      return (
      <div>
        <table>
          <tbody>
          {this.state.players.map((player) => {
            return (
              <tr>
              <td>{player.id}</td> 
              <td>{player.name}</td> 
              <td>{player.pos}</td> 
              <td>{player.nat}</td> 
              </tr>
            );
          })
          } 
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
