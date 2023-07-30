var fs = require('fs'),
    path = require('path'),
    filePath = path.join(__dirname, 'input.txt');

fs.readFile(filePath, { encoding: 'utf-8' }, function (err, data) {
    if (!err) {

        const mapy = data
            .split('\n')
            .filter(t => !!t)
            .map(t => t.split(',').map(t => t.split('-').map(a=> Number(a))))
            .map(([a, b]) => !((a[0] < b[0] && a[1] < b[0]) || (a[0] > b[1] && a[1] > b[1])))
            .filter(a=>a).length

        console.log('received data: ', mapy);
    } else {
        console.log(err);
    }
});
