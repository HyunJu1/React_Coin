import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchTopTenCoins } from '../actions/index';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { term: '' };
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.props.fetchTopTenCoins();
  }
  onInputChange(event) {
    this.setState({ term : event.target.value }); 
  }
  onFormSubmit(event) {
    event.preventDefault(); 
    this.props.fetchTopTenCoins(this.state.term); 
    this.setState({ term: '' }); 
  }
  render() {
    return (
      <form onSubmit={this.onFormSubmit} className="input-group">
        <input 
          placeholder="Search"
          className="form-control"
          value={this.state.term}
          onChange={this.onInputChange} />
        <span className="input-group-btn">
          <button type="submit" className="btn btn-primary">Submit</button>
        </span>
      </form>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchTopTenCoins }, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBar);