import React from 'react';
import {  Router, Route , Switch } from 'react-router-dom';
import history from './history';
// import { Route , Switch} from 'react-router';
import TodoList from './components/TodoList';

import './List.css';
import Create from './components/Create';
import Edit from './components/Edit';
import NavBar from './components/Navbar';
import EditGroup from './components/EditGroup';

function App() {
  return (
    <div >
      
      <NavBar />
        <Router history={history}>
         <Switch>
         <Route exact path='/' component={TodoList}/>
         <Route path='/add' component={Create} />
         <Route path='/editd' component={EditGroup} />
         <Route path='/edit/:id' component={Edit} />
         </Switch>
       </Router>
       </div>
  );
}

export default App;
