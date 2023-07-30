var fs = require('fs'),
    path = require('path'),
    filePath = path.join(__dirname, 'input.txt');

fs.readFile(filePath, { encoding: 'utf-8' }, function (err, data) {
    if (!err) {

        const mapy = data
            .split('\n')
            .filter(t => !!t)
            .map(t => ([t.slice(0, t.length / 2), t.slice(t.length / 2, t.length)]))
            .map(([a, b]) => a.split('').find(t => b.includes(t)).charCodeAt(0))
            .map(t => t > 96 ? t - 96 : 26 + t - 64)

        console.log('received data: ', mapy.reduce((a, b) => a + b, 0));
    } else {
        console.log(err);
    }
});
