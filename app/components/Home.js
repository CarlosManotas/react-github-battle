var React = require('react');
var Link = require('react-router-dom').Link;


class Home extends React.Component {
  render(){
    return(
      <div className='home'>
        <h1>Haz que peleen tus amigos de github</h1>
        <Link to='/battle' className='boton'>
          Batalla
        </Link>
      </div>
    )
  }
}

module.exports = Home;
