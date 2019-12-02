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
import Lpictures from "./container/lover/lover_image"
import Ldairy from "./container/lover/lover_note"
import List from "./container/lover/lover-list"
import Lsouvenir from "./container/lover/lover_souvenir"
import CList from "./container/lover-details/create_list"
import CNote from "./container/lover-details/create_note"
import CPhoto from "./container/lover-details/create_photo"
import CSouvenir from "./container/lover-details/create_souver"
import Lover from "./container/Lover"
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
      <Route path='/lover/lpictures' component={Lpictures}/>
      {/* <Route path='/lover/lsound' component={Lsound}/> */}
      <Route path='/lover/ldairy' component={Ldairy}/>
      <Route path='/lover/list' component={List}/>
      <Route path='/lover/lsouvenir' component={Lsouvenir}/>
      <Route path='/lover/crlist' component={CList}/>
      <Route path='/lover/crnote' component={CNote}/>
      <Route path='/lover/crphoto' component={CPhoto}/>
      <Route path='/lover/crsouvenir' component={CSouvenir}/>

     
    


    </Router>
  );
}

export default App;
