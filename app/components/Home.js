var React = require('react');
var Link = require('react-router-dom').Link;


class Home extends React.Component {
  render(){
    return(
      <div className='home'>
        <h1>Make your github friends fight</h1>
        <Link to='/battle' className='boton'>
          Battle
        </Link>
      </div>
    )
  }
}

module.exports = Home;
