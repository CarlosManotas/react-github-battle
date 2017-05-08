var React = require('react');
var PropTypes = require('prop-types');
var queryString = require('query-string');
var api = require('../utils/api.js');
var Link = require('react-router-dom').Link;


const Player = (props) => {
  const info = props.profile;
  return (
    <div className='playerView' style={{alignSelf:'baseline'}}>
      <h1>{props.label}</h1>
      <h2>Score: {props.score}</h2>
      <figure>
        <img src={info.avatar_url}/>
      </figure>
      <p>@{info.login}</p>
      <ul className='playerView-info'>
        {info.name && <li>{info.name}</li>}
        {info.location && <li>{info.location}</li>}
        {info.company && <li>{info.company}</li>}
        <li>Followers: {info.followers}</li>
        <li>Following: {info.following}</li>
        <li>Public Repos: {info.public_repos}</li>
        {info.blog && <li><a href={info.blog}>{info.blog}</a></li>}
      </ul>
    </div>
  )
}
Player.propTypes ={
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  profile: PropTypes.object.isRequired,
}
class Results extends React.Component {
  constructor(props){
    super(props);
    this.state={
      winner:null,
      loser:null,
      error:null,
      loading:true
    }
  }
  componentDidMount(){
    var players = queryString.parse(this.props.location.search);
    api.battle([players.playerOne,players.playerTwo])
        .then(e=>{
          if(!e){
            this.setState({
              error:'Esto es un error, revisa si los usuarios existen en github',
              loading: false
            })
          }
          this.setState({
            winner: e[0],
            loser: e[1],
            error:null,
            loading:false
          })
        })
        .catch(error=>console.error(error))
  }
  render(){
    const {winner , loser , error , loading} = this.state;
    if(loading){
      return <img src='https://apply.commonapp.org/Include/Contents/images/animated_loading_icon.gif' className='Loadin' />
    }
    if(error){
      return(
        <div className='battle'>
          <p>{error}</p>
          <Link className='boton'
            to='/battle'> Volver </Link>
        </div>
      )
    }
    return(
      <div className='battle'>
        <div className='battle-item'>
          <Player
            label='Winner'
            score={winner.score}
            profile={winner.profile} />
          <Player
            label='Loser'
            score={loser.score}
            profile={loser.profile} />
        </div>
      </div>
    )
  }
}
module.exports = Results;
