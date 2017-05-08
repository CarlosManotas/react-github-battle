var React = require('react');
var ReactDom = require('react-dom');
var App = require('./components/App.js');
require('./index.css');


ReactDom.render(
  <App />,
  document.getElementById('app')
);
