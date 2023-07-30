const { maxHeaderSize } = require('http');

var fs = require('fs'),
    path = require('path'),
    filePath = path.join(__dirname, 'input.txt');
let [rockA, paperA, scisorA] = ['A', 'B', 'C'];
let [rockM, paperM, scisorM] = ['X', 'Y', 'Z'];

fs.readFile(filePath, { encoding: 'utf-8' }, function (err, data) {
    if (!err) {
        let map1 = { 'A': 1, 'B': 2, 'C': 3 }
        let map2 = { 'X': 1, 'Y': 2, 'Z': 3 }
        let pointComputer =
        {
            '11': 4,
            '12': 8,
            '13': 3,
            '21': 1,
            '22': 5,
            '23': 9,
            '31': 7,
            '32': 2,
            '33': 6
        }
        const mapy = data.split('\n').filter(t => !!t).map(t => ('' + map1[t.split(' ')[0]] + map2[t.split(' ')[1]])).map(t => pointComputer[t]);


        console.log('received data: ', mapy.reduce((a, b) => { console.log(a + '+' + b, a + b); return (a + b); }, 0));
    } else {
        console.log(err);
    }
});
