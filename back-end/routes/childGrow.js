const express = require('express');
const router = express.Router();

router.get('/',function(req,res){
    res.end('/')
})
router.get('/add',function(req,res){
    res.end('add')
})
module.exports = router;