import React, { Component } from 'react';
import { createSorter } from './../util/Sort';

class List extends Component {
    state = {}
  
    componentDidMount () {
      fetch('/players')
        .then(res => res.json())
        .then(this.onLoad);
    }
  
    parseData (response) {
        console.log(response)
        return response;
    }
  
    onLoad = (data) => {
      this.setState({
        data: this.parseData(data)
      });
    }
  
    render () {
      const { data } = this.state;
  
      return data ?
        this.renderData(data) :
        this.renderLoading()
    }
  
    renderData (data) {
      if (data && data.length) {
        return (
          <div>
              <table>
                  <tbody>
                    {
                    data.map(item => (
                        <tr key={item.id}>
                            <td> {item.id} </td>
                            <td> {item.name} </td>
                            <td> {item.pos} </td>
                            <td> {item.nat} </td>
                            <td> {item.height} </td>
                            <td> {item.weight} </td>
                            <td> {item.dob} </td>
                            <td> {item.birthplace} </td>
                        </tr>
                    ))
                    }
                  </tbody>
                </table>
          </div>
        );
      } else {
        return <div>No items found</div>
      }
    }
  
    renderLoading () {
      return <div>Loading...</div>
    }
  }

  export default List;