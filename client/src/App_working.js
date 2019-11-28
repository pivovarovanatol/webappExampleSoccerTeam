import React, { Component } from 'react';
import './App.css';
import Immutable from './Immutable'
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
    .then(res => this.setState(
      {
      'players' : res,
      'isLoaded' : true
    }
    ))
  }

  setFilter(){
    console.log("Click event");

    this.setState(this.state.players.filter(player => player.name == 'Bob'));


  }




 // Working table
  render() {

    console.log(this.state.players);
      return (
      <div>

        <button onClick={this.setFilter}>Filter</button>
        <p/>
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
