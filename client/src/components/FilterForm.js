import React, { Component } from 'react';

class FilterForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            currFilter: ""
        }

    }

    handleChange = (e) => {
        this.setState({
            currFilter: e.target.value
        })
        this.props.onChange(e.target.value);
    }

    render(){
        return (
            <div>
                <label htmlFor="filter">Filter:</label>
                <input type="text" id="filter" value={this.state.currFilter} onChange={this.handleChange} />
            </div>
        )
    }

}

export default FilterForm;