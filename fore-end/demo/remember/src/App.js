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

import Lpictures from "./container/lover/Lpictures"
import Ldairy from "./container/lover/Ldairy"
import Llists from "./container/lover/Llists"
import Lsound from "./container/lover/Lsound"
import Lsouvenir from "./container/lover/Lsouvenir"
import LClists from "./container/lover/lover-details/Lcreate_list"
import LCdairy from "./container/lover/lover-details/Lcreate_note"
import LCpictures from "./container/lover/lover-details/Lcreate_photo"
import LCsouvenir from "./container/lover/lover-details/Lcreate_souver"
import LSlists from "./container/lover/lover-details/LSlists"
import LSpictures from "./container/lover/lover-details/LSpictures"
import Lover from "./container/Lover"
// 王--------
import React, { Component } from 'react';
import {BrowserRouter as Router, Route,Link} from 'react-router-dom';
import Pages from './Picture/Pages.js';
import Cpicture from './Picture/Cpicture.js';
import Create from './Picture/Create.js';
import Add from './Study/stuAdd.js';
import Cstudy from './Study/Cstudy.js';
import Add2 from './Things/eventAdd.js';
import Cevent from './Things/Cevent.js';
import small from './Things/small.js';
import Create2 from './Dairy/daiCreate.js';
import Cdairy from './Dairy/Cdairy.js';
import Add3 from './Grow/growAdd.js';
import Cgrowup from './Grow/Cgrowup.js';

function App() {
  return (
    <Router>
      <Route exact path='/' component={Start}/>
      <Route path='/resign/message' component={Message}/>
      <Route path='/menus' component={Menus}/>
      <Route path='/index' component={Index}/>
      <Route path='/Loverhome' component={Lover}/>
      <Route path='/child/cpictures' component={Cpictures}/>
      <Route path='/child/csound' component={Csound}/>
      <Route path='/child/cevents' component={Cevents}/>
      <Route path='/child/cgrowup' component={Cgrowup}/>
      <Route path='/child/cstudy' component={Cstudy}/>
      <Route path='/child/cdairy' component={Cdairy}/>

      <Route path='/lover/lpictures' component={Lpictures}/>
      <Route path='/lover/lsound' component={Lsound}/>
      <Route path='/lover/ldairy' component={Ldairy}/>
      <Route path='/lover/llists' component={Llists}/>
      <Route path='/lover/lsouvenir' component={Lsouvenir}/>
      <Route path='/lover/lclist' component={LClists}/>
      <Route path='/lover/lcdairy' component={LCdairy}/>
      <Route path='/lover/lcpictures' component={LCpictures}/>
      <Route path='/lover/lcsouvenir' component={LCsouvenir}/>
      <Route path='/lover/lslists' component={LSlists}/>
      <Route path='/lover/lspictures' component={LSpictures}/>
      
      {/* 王------ */}
      <Route path='/Cpicture' component={Cpicture}/>
      <Route path='/Create' component={Create}/>
      <Route path='/Pages' component={Pages}/>
      <Route path='/stuAdd' component={Add}/>
      <Route path='/Cstudy' component={Cstudy}/>
      <Route path='/eventAdd' component={Add2}/>
      <Route path='/Cevent' component={Cevent}/>
      <Route path='/Cdairy' component={Cdairy}/>
      <Route path='/daiCreate' component={Create2}/>
      <Route path='/growAdd' component={Add3}/>
      <Route path='/Cgrowup' component={Cgrowup}/>
      <Route path='/small'component={small}/>
  </Router>
  );
}

export default App;
