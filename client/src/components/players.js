import React, { Component } from 'react';
import { createSorter } from './../util/Sort';
import { createFilter } from './../util/filter';
import FilterForm from './FilterForm';

class Players extends Component {
    state = {
      players: [],
      filters: this.props.filters,
      sorters: this.props.sorters
      };
    
    constructor(props){
      super(props);
      this.state = {
        filter: '',
        players: [],
        filteredPLayers:[],
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

      this.handleChange = this.handleChange.bind(this);
      this.handleFilter = this.handleFilter.bind(this);
    }

    static defaultProps = {
      filters: [{
        property: 'name',
        value: 'Dav'
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
      })
      this.setState({
        players: this.state.data
      })

    }

    handleChange(event){
      this.setState({filter: event.target.value});
    }

    handleFilter(event){
      event.preventDefault();
      //console.log("Filtering by " + this.state.filter);
      const filter = this.state.filter;
      let filteredPlayers = this.state.players;
      filteredPlayers = filteredPlayers.filter((player) => {
        let nameHasFilter = player.name.toLowerCase().indexOf(filter.toLowerCase()) !==-1
        let idHasFilter = player.id.toString().toLowerCase().indexOf(filter.toLowerCase()) !==-1
        let posHasFilter = player.pos.toLowerCase().indexOf(filter.toLowerCase()) !==-1
        let natHasFilter = player.nat.toLowerCase().indexOf(filter.toLowerCase()) !==-1
        let heightHasFilter = player.height.toString().toLowerCase().indexOf(filter.toLowerCase()) !==-1
        let weightHasFilter = player.weight.toString().toLowerCase().indexOf(filter.toLowerCase()) !==-1
        let dobHasFilter = player.dob.toLowerCase().indexOf(filter.toLowerCase()) !==-1
        let birthplaceHasFilter = player.birthplace.toLowerCase().indexOf(filter.toLowerCase()) !==-1
        return (nameHasFilter || idHasFilter || posHasFilter || natHasFilter  || heightHasFilter || weightHasFilter || dobHasFilter || birthplaceHasFilter)
      });

      // }]});
      //this.setState({data: this.state.data});
      this.setState({data: filteredPlayers});
      //event.preventDefault();
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
          <p/>
            <form onSubmit={this.handleFilter}>
              <label>
                Filter:
                <input type="text" value={this.state.filter} onChange={this.handleChange} />
              </label>
              <input type="submit" value="Filter" />
            </form>
            <p/>
          </div>

          <div>
              <table>
                <thead>
                  <tr>
                    <th>Player Id</th>
                    <th>Player Name</th>
                    <th>Position</th>
                    <th>Nationality</th>
                    <th>Player Height</th>
                    <th>Player Weight</th>
                    <th>Date of Birth</th>
                    <th>Place of Birth</th>
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
        return (
          <div>
          <div>
          <p/>
            <form onSubmit={this.handleFilter}>
              <label>
                Filter:
                <input type="text" value={this.state.filter} onChange={this.handleChange} />
              </label>
              <input type="submit" value="Filter" />
            </form>
            <p/>
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
                  </tbody>
                </table>
          </div>
          <div>No items found</div>
          </div>
        )
      }
    }
  
    renderLoading () {
      return <div>Loading...</div>
    }
  }

  export default Players;