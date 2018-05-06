import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchCoins } from '../actions/index';
import { Link } from 'react-router-dom';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { term: '' };
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.props.fetchCoins();
  }
  onInputChange(event) {
    this.setState({ term : event.target.value }); 
  }
  onFormSubmit(event) {
    
    event.preventDefault(); 
    this.props.fetchCoins(this.state.term); 
    
    <Link to={`/${this.state.term}`}></Link>;
    this.setState({ term: '' }); 
  }
 
  render() {
    return (

      <form onSubmit={this.onFormSubmit} className="input-group">
        <input 
          placeholder="Search For Coin Name"
          className="form-control"
          value={this.state.term} 
          onChange={this.onInputChange}
        />
        <span className="input-group-btn">
          <Link to={`/${this.state.term.toLowerCase()}`}><button type="submit" className="btn btn-dark">Search</button></Link>
        </span>
      </form>

    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchCoins }, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBar);