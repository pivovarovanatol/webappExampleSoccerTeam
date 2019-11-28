import React, { Component } from 'react';
import { createSorter } from './../util/Sort';
import { createFilter } from './../util/filter';

class Players extends Component {
    state = {
      filters: this.props.filters,
      sorters: this.props.sorters
      };
    
    constructor(props){
      super(props);
    }

    static defaultProps = {
      filters: [{
        property: 'name',
        value: ''
      }, {
        property: 'pos',
        value: ''
      }],

      sorters: [{
        property: 'id'
      }, {
        property: 'name'
      }]
    };
      
    componentDidMount () {
      fetch('/players')
        .then(res => res.json())
        .then(this.onLoad);
    }
  
    parseData(data) {
        const { sorters } = this.state;
    
        if (data && data.length) {
          if (Array.isArray(sorters) && sorters.length) {
            data.sort(createSorter(...sorters));
          }
        }
    
        return data;
      }
      
      

    onLoad = (data) => {
      this.setState({
        data: this.parseData(data)
      });
    }
  
    onFilter(text){
      this.props.filters.name = 'id';
      this.props.filters.value = text;
      console.log("Filter by: " + text);
    }

    render () {
      const { data } = this.state;
  
      return data ?
        this.renderData(data) :
        this.renderLoading()
    }
  
    renderData (data) {
      if (data && data.length > 0) {
        const { filters } = this.state;
  
        if (Array.isArray(filters) && filters.length) {
          data = data.filter(createFilter(...filters));
        }

        return (
          <div>
          <div>
            <input type="text" name="filter" />
            <button onPress={this.onFilter('hello')}>Filter</button>
          </div>

          <div>
              <table>
                <thead>
                  <tr>
                    <th>Player Id</th>
                    <th>Player Name</th>
                  </tr>
              </thead>
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

  export default Players;