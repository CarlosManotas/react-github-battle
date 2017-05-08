var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api.js');

const MuestraLenguaje = (props) =>{
  const lenguajes = ['All','Javascript','Ruby','Java','Css','Python'];
  return(
    <ul className='lista'>
      {lenguajes.map(lengua=><li  onClick={props.handle.bind(null,lengua)} className={props.selected===lengua?'selected':''} key={lengua}>{lengua}</li>)}
    </ul>
  )
}

MuestraLenguaje.propTypes={
  handle: PropTypes.func.isRequired,
  selected: PropTypes.string.isRequired
}

const RepoGrid = (props) => {
  return (
    <ul className='lista-repos'>
      {props.repos.map((repo, index)=>{
        return (
          <li  key={repo.name}>
            <a className='lista-item' style={{animationDelay: `${index*0.05}s`}} href={repo.html_url} target='blank' >
              <div className='number'><sup>{index + 1}</sup>º</div>
              <figure>
                <img src={repo.owner.avatar_url} alt={`Avatar de ${repo.owner.login}`}/>
              </figure>
              <ul className='lista-item-info'>
                <li>{repo.name}</li>
                <li>@{repo.owner.login}</li>
                <li>{repo.stargazers_count} starts</li>
              </ul>
            </a>
          </li>
        )
      })}
    </ul>
  )
}
RepoGrid.propTypes={
  repos: PropTypes.array.isRequired
}


class Popular extends React.Component {
  constructor(props){
    super(props)
    this.state= {
      selectedLenguaje: 'All',
      repos: null
    }
   this.updateLenguaje = this.updateLenguaje.bind(this)
  }
  componentDidMount() {
    this.updateLenguaje(this.state.selectedLenguaje);
  }
   updateLenguaje(lengua) {
    this.setState({selectedLenguaje:lengua , repos:null})
    api.fecthPopularRepos(lengua)
        .then(res=>this.setState({repos:res}))
  }
  render() {
    return(
      <div>
        <MuestraLenguaje
          selected={this.state.selectedLenguaje}
          handle={this.updateLenguaje}
        />
        {!this.state.repos?
          <img src='https://apply.commonapp.org/Include/Contents/images/animated_loading_icon.gif' className='Loadin' />:
          <RepoGrid repos={this.state.repos} />
        }

      </div>
    )
  }
}

module.exports = Popular;
