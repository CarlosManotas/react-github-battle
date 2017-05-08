var React = require('react');
var PropTypes = require('prop-types');
var PlayerInput = require('./PlayerInput');
var PlayerView = require('./PlayerView');
var Link = require('react-router-dom').Link;

class Battle extends React.Component {
  constructor(props){
    super(props);
    this.state={
      playerOne:'',
      playerTwo:'',
      playerOneImage: null,
      playerTwoImage: null
    }
    this.handleSubmit=this.handleSubmit.bind(this);
    this.handleReset=this.handleReset.bind(this);
  }
  handleSubmit(id , username) {
    this.setState(()=>{
      var newState = {};
      newState[id] = username;
      newState[id + 'Image'] = `https://github.com/${username}.png?size=200`;
      return newState;
    });
  }
  handleReset(id){
    this.setState(()=>{
      var newState = {};
      newState[id] = '';
      newState[id + 'Image'] = null;
      return newState;
    });
  }
  render(){
    var match = this.props.match;
    return(
      <div className='battle'>
        <div className='battle-item'>
          {!this.state.playerOne &&
            <PlayerInput
              id='playerOne'
              label='Player One'
              onSubmit={this.handleSubmit}
              />}
          {this.state.playerOneImage &&
            <PlayerView
              avatar={this.state.playerOneImage}
              id='playerOne'
              username={this.state.playerOne}
              onReset={this.handleReset}
            />}
          {!this.state.playerTwo &&
            <PlayerInput
              id='playerTwo'
              label='Player Two'
              onSubmit={this.handleSubmit}
              />}
          {this.state.playerTwoImage &&
            <PlayerView
              avatar={this.state.playerTwoImage}
              id='playerTwo'
              username={this.state.playerTwo}
              onReset={this.handleReset}
            />}
        </div>

        {this.state.playerTwoImage && this.state.playerOneImage &&
          <div className='battle-item'>
            <Link className='boton' 
              to={{
                pathname: `${match.url}/results`,
                search: `?playerOne=${this.state.playerOne}&playerTwo=${this.state.playerTwo}`
              }}> Submit </Link>
          </div>
        }
      </div>
    )
  }
}

module.exports = Battle;
