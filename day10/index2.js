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

        let cycleNumber = 0
        let sprite = [0, 1, 2]

        let pixels = [...Array(6)].map(t => [...Array(40)])
        console.log('pix', pixels)
        const writePix = () => {
            console.log('cn', cycleNumber, cycleNumber / 40, cycleNumber % 40)
            pixels[Math.floor(cycleNumber / 40)][cycleNumber % 40] = sprite.includes(cycleNumber % 40) ? '#' : '.'
        }
        mapy.forEach(([instruction, number]) => {
            switch (instruction) {
                case 'addx':
                    writePix();
                    cycleNumber++;
                    writePix();
                    cycleNumber++;
                    sprite = sprite.map(t => t + number)
                    break;
                case 'noop':
                    writePix();
                    cycleNumber++;
                    break;

                default:
                    break;
            }
        })
        console.log('received data: \n', pixels.map(t => t.join('')).join('\n'));
    } else {
        console.log(err);
    }
});
