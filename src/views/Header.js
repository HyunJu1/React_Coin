import React,{Component}  from 'react';
import Timestamp from 'react-timestamp';
import SearchBar from '../components/searchBar';
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
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="/">HyunJu-Cryptocurrency</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              <li className="nav-item active">
                <a className="nav-link" href="/">Coin Table</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Change Compare Graph</a>
              </li>

            </ul>
            {/* <form className="form-inline my-2 my-lg-0"> */}
            <SearchBar/>
          </div>
        </nav>
        <div className="App-header">
        
          <br/>
          <h1 className="App-title">Cryptocurrency Top10 Market</h1>
          <br/>
          <h6>  
              (Current Time : <Timestamp time={this.state.now}  format="full"  /> )
          </h6>
          <br/>
   
          
          
        </div>      
      </div>
    );
  }
}
export default Header;
