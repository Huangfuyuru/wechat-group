const express = require('express'),
      app = express(),
      router = express.Router();
router.get('/',function(req,res,next){
    res.end('/child/csound')
})

module.exports = router;