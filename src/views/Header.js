import React,{Component}  from 'react';
import Timestamp from 'react-timestamp';
import SearchBar from '../containers/searchBar';
import '../index.css';
class Header extends Component {
  componentDidMount(){
    setInterval(function() {
      this.setState({now: Date.now()/1000});
    }.bind(this), 30000);
  }
  constructor(props){
    super(props);
    this.state={
      now:Date.now()/1000,

    };
  }
  render(){
    return (
      <div className="App">
        <header className="App-header">
          <br/>
          <h1 className="App-title">Cryptocurrency Top10 Market</h1>
          <br/>
          <h6>  
              (Last Updated : <Timestamp time={this.state.now}  format="full"  /> )
          </h6>
          <br/>
   
          <SearchBar/>
          
        </header>      
      </div>
    );
  }
}
export default Header;
