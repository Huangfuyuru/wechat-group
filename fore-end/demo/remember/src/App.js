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
import LCsound from "./container/lover/lover-details/Lcreate_sound"
import Lover from "./container/Lover"
import Child from "./container/Child"
import My from './container/My';
import Friends from './container/Friends';

import Ccpicture from './container/child/child_details/Ccpicture'
import Showpicture from './container/child/child_details/Showpicture'
import Ccdairy from './container/child/child_details/Ccdairy'
import Ccevent from './container/child/child_details/Ccevent'
import Ccstudy from './container/child/child_details/Ccstudy'
import Ccgrow from './container/child/child_details/Ccgrow'
import Showevent from './container/child/child_details/Showevent'

import Crelation from './container/my/Crelation'
import Crelation2 from './container/my/Crelation2'
import Delrelation from './container/my/Delrelation'
import Delrelation2 from './container/my/Delrelation2'
import message from './container/my/Message'
import Use from './container/my/Use'
// import Ccsound from './container/child/child_details/Ccsound';

function App() {
  return (
    <Router> 
      <Route exact path='/' component={Start}/>
      <Route path='/menus' component={Menus}/>
      <Route path='/resign/message' component={Message}/>
      <Route path='/index' component={Index}/>

      {/* 亲子 */}
      <Route path='/index/child' component={Child}/>
      <Route exact path='/child/cpictures' component={Cpictures}/>
      <Route path='/child/cpictures/show' component={Showpicture}/>
      <Route path='/child/cpictures/ccpicture' component={Ccpicture}/>

      <Route exact path='/child/csound' component={Csound}/>
      {/* <Route exact path='/child/csound/ccsound' component={Ccsound}/> */}

      <Route exact path='/child/cevents' component={Cevents}/>
      <Route path='/child/cevents/show' component={Showevent}/>
      <Route path='/child/cevents/ccevent' component={Ccevent}/>

      <Route exact path='/child/cgrowup' component={Cgrowup}/>
      <Route path='/child/cgrowup/ccgrow' component={Ccgrow}/>

      <Route exact path='/child/cstudy' component={Cstudy}/>
      <Route path='/child/cstudy/ccstudy' component={Ccstudy}/>

      <Route exact path='/child/cdairy' component={Cdairy}/>
      <Route path='/child/cdairy/ccdairy' component={Ccdairy}/>
      
      {/* 爱人 */}
      <Route path='/index/lover' component={Lover}/>

      <Route path='/lover/lpictures' component={Lpictures}/>
      <Route path='/lover/lspictures' component={LSpictures}/>
      <Route path='/lover/lcpictures' component={LCpictures}/>

      <Route path='/lover/lsound' component={Lsound}/>
      <Route path='/lover/lcsound' component={LCsound}/>

      <Route path='/lover/ldairy' component={Ldairy}/>
      <Route path='/lover/lcdairy' component={LCdairy}/>

      <Route path='/lover/llists' component={Llists}/>
      <Route path='/lover/lclist' component={LClists}/>
      <Route path='/lover/lslists' component={LSlists}/>

      <Route path='/lover/lsouvenir' component={Lsouvenir}/>
      <Route path='/lover/lcsouvenir' component={LCsouvenir}/>

      <Route path='/index/friend' component={Friends}/>

      {/* 我的 */}
      <Route path='/index/my' component={My}/>
      <Route exact path='/my/crelation' component={Crelation}/>
      <Route exact path='/my/crelation2' component={Crelation2}/>
      <Route exact path='/my/delrelation' component={Delrelation}/>
      <Route exact path='/my/delrelation2' component={Delrelation2}/>
      <Route exact path='/my/use' component={Use}/>
      <Route exact path='/my/message' component={message}/>
  </Router>
  );
}

export default App;
