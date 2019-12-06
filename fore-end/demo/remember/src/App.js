import React from 'react';
import {BrowserRouter as Router, Route,Link} from 'react-router-dom'
import Menus from './container/Menus'
import Start from './container/Start';
import Message from './container/Message';
import Index from './container/Index';
import Cpictures from './container/child/Cpicture'
import Csound from './container/child/Csound'
import Cevents from './container/child/Cevent'
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
import Child from "./container/Child"
import My from './container/My';
import Friends from './container/Friends';

function App() {
  return (
    <Router>
      <Route exact path='/' component={Start}/>
      <Route path='/menus' component={Menus}/>
      <Route path='/resign/message' component={Message}/>
      <Route path='/index' component={Index}/>
      <Route path='/index/child' component={Child}/>
      <Route path='/index/lover' component={Lover}/>
      <Route path='/index/friends' component={Friends}/>
      <Route path='/index/my' component={My}/>
      
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
  </Router>
  );
}

export default App;
