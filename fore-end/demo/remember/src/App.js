import React from 'react';
import {BrowserRouter as Router, Route,Link} from 'react-router-dom'
import Menus from './container/Menus'
import Start from './container/Start';
import Message from './container/Message';
import Index from './container/Index';
import Cpictures from './container/child/Cpictures'
import Csound from './container/child/Csound'
import Cevents from './container/child/Cevents'
import Cgrowup from './container/child/Cgrowup'
import Cstudy from './container/child/Cstudy'
import Cdairy from './container/child/Cdairy'
function App() {
  return (
    <Router>
      <Route exact path='/' component={Start}/>
      <Route path='/resign/message' component={Message}/>
      <Route path='/menus' component={Menus}/>
      <Route path='/index' component={Index}/>
      <Route path='/child/cpictures' component={Cpictures}/>
      <Route path='/child/csound' component={Csound}/>
      <Route path='/child/cevents' component={Cevents}/>
      <Route path='/child/cgrowup' component={Cgrowup}/>
      <Route path='/child/cstudy' component={Cstudy}/>
      <Route path='/child/cdairy' component={Cdairy}/>
    </Router>
  );
}

export default App;
