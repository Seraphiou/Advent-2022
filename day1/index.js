var fs = require('fs'),
    path = require('path'),
    filePath = path.join(__dirname, 'input.txt');

let bundle=[];
fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
    if (!err) {
        bundle = Math.max(...(data.split('\n\n').map(t=>t.split('\n').map(t=>Number(t)).reduce((a,b)=>a+b,0))));


console.log('received data: ', bundle);
    } else {
        console.log(err);
    }
});
