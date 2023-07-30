const { time } = require('console');

var fs = require('fs'),
    path = require('path'),
    filePath = path.join(__dirname, 'input.txt');

fs.readFile(filePath, { encoding: 'utf-8' }, function (err, data) {
    if (!err) {

        const mapy = data
            .split('\n')
            .filter(t => !!t)
            .map(t => t.split(' '))
            .map(t => [t[0], Number(t[1])])

        let cycleNumbers = [20, 60, 100, 140, 180, 220]
        let cycleNumbersValue = []
        let valueX = 1
        let cycleNumber = 0
        mapy.forEach(([instruction, number]) => {
            switch (instruction) {
                case 'addx':
                    cycleNumber++;
                    cycleNumbers.includes(cycleNumber) && cycleNumbersValue.push(cycleNumber * valueX)
                    cycleNumber++;
                    cycleNumbers.includes(cycleNumber) && cycleNumbersValue.push(cycleNumber * valueX)
                    valueX += number;
                    break;
                case 'noop':
                    cycleNumber++;
                    cycleNumbers.includes(cycleNumber) && cycleNumbersValue.push(cycleNumber * valueX)
                    break;

                default:
                    break;
            }
        })
        console.log('received data: ', mapy, cycleNumbersValue.reduce((a, b) => a + b, 0));
    } else {
        console.log(err);
    }
});
