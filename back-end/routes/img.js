const express = require('express');
const formidable = require('formidable');
const router = express.Router();
const fs = require('fs');
router.post('/',function(req,res){
    console.log("hello");
    var form = new formidable.IncomingForm();
    form.uploadDir = "D:/database/img";
    form.keepExtensions = true; 
    form.maxFieldSize = 2*1024*1024;
    form.parse(req, function (error, fields, files) { 
        console.log(files); 
        if(error) {
            var message = {err:1, msg:"文件解析失败"};
        }
        var a = files.path.split("\\");
        var b = a[a.length-1];
        var message = {err:0, path:`http://localhost:3000/img/showimg/${b}`};
        res.write(JSON.stringify(message));   
        res.end();
    });
    
})

router.get('/showimg/:name',function(req,res){
    var filename = req.params.name;
    var ext = filename.split('.')[1];
    var img = fs.readFileSync(`D:/database/img/${filename}`);
    res.writeHead(200,{
        "Content-Type":"image"+ext
    })
    res.end(img)
})
module.exports = router;