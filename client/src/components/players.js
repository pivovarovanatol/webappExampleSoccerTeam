import React, { Component } from 'react';
import { createSorter } from './../util/Sort';
import { createFilter } from './../util/filter';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Header from './Header';

class Players extends Component {
    state = {
      players: [],
      filters: this.props.filters,
      sorters: this.props.sorters,
      natAggr: []
      };
    
    constructor(props){
      super(props);
      this.state = {
        filter: '',
        players: [],
        natAggr: [{
          nat:'',
          count:0
        }],
        sortBy: 'name',
        sortDir: 'ASC',
        filteredPLayers:[],
        sortedPlayers:[],
        filters: [{
          property: 'name',
          value: ''
        }, {
          property: 'pos',
          value: ''
        }],
  
        sorters: [{
          property: 'name',
          direction: 'ASC'
        }, {
          property: 'id'
        }, {
          property: 'nat'
        }, {
          property: 'dob'
        }]

      };

      this.handleChange = this.handleChange.bind(this);
      this.handleFilter = this.handleFilter.bind(this);
      this.handleSort = this.handleSort.bind(this);
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

    // Sorting handlers 
    sortById = () => {
      this.handleSort('id');
    }
    sortByName = () => {
      this.handleSort('name');
    }
    sortByPos = () => {
      this.handleSort('pos');
    }
    sortByNat = () => {
      this.handleSort('nat');
    }
    sortByHeight = () => {
      this.handleSort('height');
    }
    sortByWeight = () => {
      this.handleSort('weight');
    }
    sortByDOB = () => {
      this.handleSort('dob');
    }
    sortByBirthPlace = () => {
      this.handleSort('birthplace');
    }

    handleSort(prop){
      var curDir = this.state.sortDir;
      var oldProp = this.state.sorters[0].property;
      if (typeof prop === 'undefined') {
        prop = this.state.sorters[0].property;
      } else {
        if (oldProp === prop){
          if (curDir=== 'ASC') {
            curDir = 'DESC';
          } else {
            curDir = 'ASC';
          }
        } else {
          curDir = 'ASC';
        }
      }

      this.setState({sortBy: prop})
      let sorters= this.state.sorters;
      sorters[0].property = prop.toString();
      sorters[0].direction = curDir.toString();
      
      let sortedPlayers = this.state.data;
      sortedPlayers = sortedPlayers.sort(createSorter(...sorters));

      this.setState({sortDir: curDir});
      this.setState({sorters: sorters});
      this.setState({data: sortedPlayers});
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
      // should sort accordingly
      this.setState({data: filteredPlayers});
      //this.handleSort();
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
        
        var myMap = new Map();
        var natAggr = this.state.natAggr;
        
        data.forEach(element => {
          var nat = element.nat.toString();
          if (myMap.has(nat)){
            var count = myMap.get(nat);
            count++;
            myMap.delete(nat);
            myMap.set(nat, count);
          } else {
              myMap.set(nat, 1)
          }
        })

        natAggr = Array.from(myMap);

        return (
          <div>
            <Header />
          <div>
          <p/>
            <Form  onSubmit={this.handleFilter}>
              <Form.Row >
                  <Form.Control type="input" placeholder="Type your search here..." size='sm' 
                  value={this.state.filter} onChange={this.handleChange} />
                  <Button variant="secondary" block size="sm" type="submit">Filter</Button>
              </Form.Row>
            </Form>
            <p/>
          </div>

          <div>
            <Table variant="light" size="sm" striped bordered block>
              <tbody>
              <tr>
              {
                natAggr.map((item) => (
                  <td key={item[0]} size="sm">  {item[0]} : {item[1]} </td>
                ))
                }
              </tr>
              </tbody>
            </Table>
          </div>


          <div>
              <Table size="sm" striped bordered block>
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
                    <tr >
                      <td> <Button onClick={this.sortById} variant="light" active block size="sm"> sort </Button></td>
                      <td> <Button onClick={this.sortByName} variant="light" active block size="sm"> sort </Button></td>
                      <td> <Button onClick={this.sortByPos} variant="light" active block size="sm"> sort </Button></td>
                      <td> <Button onClick={this.sortByNat} variant="light" active block size="sm"> sort </Button></td>
                      <td> <Button onClick={this.sortByHeight} variant="light" active block size="sm"> sort </Button></td>
                      <td> <Button onClick={this.sortByWeight} variant="light" active block size="sm"> sort </Button></td>
                      <td> <Button onClick={this.sortByDOB} variant="light" active block size="sm"> sort </Button></td>
                      <td> <Button onClick={this.sortByBirthPlace} variant="light" active block size="sm"> sort </Button></td>
                    </tr>
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
                </Table>
          </div>
          </div>
        );
      } else {
        return (
          <div>
            <Header />
          <div>
          <p/>
            <Form onSubmit={this.handleFilter}>
              <Form.Row >
                  <Form.Control type="input" placeholder="Type your search here..." size='sm' 
                  value={this.state.filter} onChange={this.handleChange} />
                  <Button variant="secondary" block size="sm" type="submit">Filter</Button>
              </Form.Row>
            </Form>
            <p/>
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