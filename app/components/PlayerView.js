var React = require('react');
var PropTypes = require('prop-types');

const PlayerView = (props)=>{
  return(
    <div className='playerView'>
      <figure>
        <img className='avatar' src={props.avatar}/>
      </figure>
      <h2>@{props.username}</h2>
      <button
        onClick={props.onReset.bind(null,props.id)}
        className='reset'>
          Reset
      </button>
    </div>
  )
}
PlayerView.propTypes ={
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired
}

module.exports = PlayerView;
