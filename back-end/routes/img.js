const express = require('express');
const formidable = require('formidable');
const router = express.Router();
const fs = require('fs');

router.post('/',function(req,res){
    const form = new formidable.IncomingForm();
    form.uploadDir = './img';//上传文件的保存路径
    form.keepExtendions = true;
    form.maxFieldsSize = 20 * 1024 * 1024;
    form.parse(req, function (error, fields, files){
        if(error){
            var message={err:1,msg:'文件解析失败'}
        }
        var message = {err:0,path:`http://localhost:3000/${files.file.path}`};
        res.write(JSON.stringify(message));
        res.end()
    })
})

module.exports = router;