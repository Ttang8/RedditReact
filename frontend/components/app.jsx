import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import HomeContainer from './home/home_container';
import HeaderContainer from './header/header_container';

const App = () => (
  <div>
    <HomeContainer />
    <footer></footer>
  </div>
);

export default App;
