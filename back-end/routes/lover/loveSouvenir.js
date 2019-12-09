const express = require('express'),
      app = express(),
      router = express.Router();

router.get('/',function(req,res,next){
    res.end('hello loveSouvenir');
    
})

router.get('/',function(req,res,next){

})
module.exports = router;