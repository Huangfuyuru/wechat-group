const express = require('express'),
      app = express(),
      router = express.Router();
router.get('/',function(req,res,next){
    res.end('/child/cevents')
})

module.exports = router;