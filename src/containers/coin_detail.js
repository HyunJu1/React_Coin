import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {fetchCoin} from '../actions';
import { connect } from "react-redux";
import '../index.css';
class CoinDetail extends Component{
  componentDidMount(){
    const { id } = this.props.match.params;
    this.props.fetchCoin(id);
    console.log('id :' +id);
  }

  render(){
    const {coins} = this.props;
    if (!coins){
      return <div>Loading...</div>;
    }
    return(
      <div>
  

        <h1>{coins.name}</h1>
        <h3>price-{coins.price_usd}</h3>
        <h3>market cap-{coins.market_cap_usd}</h3>
        <h3>circulation supply-{coins.available_supply}</h3>
        <br/>
        <br/>

        <Link to="/" className="btn btn-primary back">Go Back</Link>
 
      </div>    
    );
  }
}

function mapStateToProps({ coin }, ownProps) {
  return { coins: coin[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchCoin }) (CoinDetail);
