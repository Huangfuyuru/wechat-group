import React from 'react';
import {BrowserRouter as Router, Route,Link} from 'react-router-dom'
import Menus from './container/Menus'
import Start from './container/Start';
import Message from './container/Message';
function App() {
  return (
    <Router>
      <Route exact path='/' component={Start}/>
      <Route path='/resign/message' component={Message}/>
      <Route path='/menus' component={Menus}/>
    </Router>
  );
}

export default App;
