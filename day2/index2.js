const { maxHeaderSize } = require('http');

var fs = require('fs'),
    path = require('path'),
    filePath = path.join(__dirname, 'input.txt');
let [rockA, paperA, scisorA] = ['A', 'B', 'C'];
const pointCompute = {
    'A X': 3,
    'A Y': 4,
    'A Z': 8,
    'B X': 1,
    'B Y': 5,
    'B Z': 9,
    'C X': 2,
    'C Y': 6,
    'C Z': 7,
}

fs.readFile(filePath, { encoding: 'utf-8' }, function (err, data) {
    if (!err) {
        const mapy = data.split('\n').filter(t => !!t).map(t => pointCompute[t]);


        console.log('received data: ', mapy.reduce((a, b) =>  (a + b), 0));
    } else {
        console.log(err);
    }
});
