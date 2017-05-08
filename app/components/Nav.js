var React = require('react');
var NavLink = require('react-router-dom').NavLink;


const Nav = () => {
  return (
    <ul className='nav'>
      <li>
        <NavLink exact activeClassName='active' to='/'>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName='active' to='/battle'>
          Battle
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName='active' to='/popular'>
          Popular
        </NavLink>
      </li>
      <li style={{marginLeft:'auto'}}>
        <a className="github-button" href="https://github.com/CarlosManotas/react-github-battle" data-icon="octicon-star" data-size="large" data-show-count="true" aria-label="Star CarlosManotas/react-github-battle on GitHub">Star</a>
      </li>

    </ul>
  )
}

module.exports = Nav;
