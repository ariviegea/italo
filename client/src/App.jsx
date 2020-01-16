import React from 'react';
import './scss/App.scss';
import { Switch, Route } from "react-router-dom";
import Apartments from './components/Apartments/Apartments';
import Navigation from './components/Navigation/Navigation';
import Home from './components/Home/Home';
import Admin from './components/Admin/Admin';

function App() {
  return (
    <div className="App">
      <Navigation className='nav'/>
      <Switch>
        <Route path='/' exact component={Home}/>
        <Route path='/apartments' component={Apartments}/>
        <Route path='/admin' component={Admin}/> 
      </Switch>
    </div>
  );
}

export default App;
