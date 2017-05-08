var React = require('react');
var PropTypes = require('prop-types');

class PlayerInput extends React.Component {
  constructor(props){
    super(props);
    this.state={
      name: ''
    }
    this.handle=this.handle.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }
  handleSubmit(event){
    event.preventDefault();
    this.props.onSubmit(
      this.props.id,
      this.state.name
    );
  }
  handle(event){
    var final = event.target.value;
    this.setState({name:final});
  }
  render(){
    return(
      <form className='form' onSubmit={this.handleSubmit}>
        <label htmlFor='user'>{this.props.label}</label>
        <input
          id='user'
          type='text'
          autoComplete='off'
          placeholder='User name'
          value={this.state.name}
          onChange={this.handle}/>
        <button
          type='submit'
          disabled={!this.state.name}
          className='boton'>
          Submit
        </button>
      </form>
    )
  }
}

PlayerInput.propTypes ={
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
}


module.exports = PlayerInput;
