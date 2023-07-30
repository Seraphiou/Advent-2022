var fs = require('fs'),
    path = require('path'),
    filePath = path.join(__dirname, 'input.txt');

fs.readFile(filePath, { encoding: 'utf-8' }, function (err, data) {
    if (!err) {

        const mapy = data
            .split('\n')
            .filter(t => !!t)

        let mapOf3 = [];
        for (let i = 0; i < mapy.length; i += 3) {
            const chunk = mapy.slice(i, i + 3);
            mapOf3.push(chunk)
        }
        let mapo = mapOf3.map(([a, b, c]) => a.split('').find(t => b.includes(t) && c.includes(t))).map(t => t.charCodeAt(0)).map(t => t > 96 ? t - 96 : 26 + t - 64)

        console.log('received data: ', mapo.reduce((a, b) => a + b, 0));
    } else {
        console.log(err);
    }
});
