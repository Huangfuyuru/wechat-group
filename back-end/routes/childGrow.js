const express = require('express');
const router = express.Router();

router.get('/',function(req,res){
    res.end('/')
})
router.get('/login',function(req,res){
    res.end('login')
})

module.exports = router