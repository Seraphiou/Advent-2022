var fs = require('fs'),
    path = require('path'),
    filePath = path.join(__dirname, 'input.txt');


fs.readFile(filePath, { encoding: 'utf-8' }, function (err, data) {
    if (!err) {
        const mapy = data.split('\n\n').map(t => t.split('\n').map(t => Number(t)).reduce((a, b) => a + b, 0));
        let max1 = Math.max(...(mapy));
        let max2 = Math.max(...(mapy.filter(t => t !== max1)));
        let max3 = Math.max(...(mapy.filter(t => t !== max1&&t !== max2)));


        console.log('received data: ', [max1,max2,max3],max1 + max2 + max3);
    } else {
        console.log(err);
    }
});
