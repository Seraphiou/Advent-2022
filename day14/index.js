const { time } = require('console');
const { finished } = require('stream');

var fs = require('fs'),
    path = require('path'),
    filePath = path.join(__dirname, 'input.txt');

const checkPosition = (positionX, positionY, maple) => {
    if (maple[positionY] === undefined || maple[positionY][positionX] === undefined) {

    }
    const value = maple[positionY][positionX];
    if (value === '.') {
        return [positionX, positionY];
    }
    if (value === '#' && value === 'o') {
        return false;
    }
}
function testBlocksUnder([x, y], maple) {
    return checkPosition(x, y + 1, maple) || checkPosition(x - 1, y + 1, maple) || checkPosition(x + 1, y + 1, maple);
}
fs.readFile(filePath, { encoding: 'utf-8' }, function (err, data) {
    if (!err) {

        const mapy = data
            .split('\n')
            .filter(t => !!t)
            .map(t => t.split(' -> ').map(k => k.split(',').map(l => Number(l))))
        const maxX = Math.max(...mapy.flatMap(t => t).flatMap(t => t[0]))
        const maxY = Math.max(...mapy.flatMap(t => t).flatMap(t => t[1]))
        const minX = Math.min(...mapy.flatMap(t => t).flatMap(t => t[0]))
        const minY = Math.min(...mapy.flatMap(t => t).flatMap(t => t[1]))

        const [minLX, maxLX, minLY, maxLY] = [500 - maxY - 10, 500 + maxY + 10, 0, maxY + 1]
        let mapo = [...Array(maxLY - minLY).keys()].map(t => ([...Array(maxLX - minLX).keys()].map(t => '.')))
        const segments = mapy.map(t => t.map((u, i, v) => ([u, v[i + 1] || [undefined, undefined]])));
        segments.map(k => k.forEach(([[i1, j1], [i2, j2]]) => {
            if (!!i2) {
                if (i1 === i2) {
                    for (let j = j1; j2 > j1 ? j <= j2 : j >= j2; j2 > j1 ? j++ : j--) {
                        mapo[j - minLY][i1 - minLX] = '#'

                    }
                }
                if (j1 === j2) {
                    for (let i = i1; i2 > i1 ? i <= i2 : i >= i2; i2 > i1 ? i++ : i--) {
                        mapo[j1 - minLY][i - minLX] = '#'
                    }
                }
            }
        })
        )
        mapo = [...mapo, mapo[0].map(t => '.'), mapo[0].map(t => '#')]

        const fallUnitlStop = () => {
            const initialPotition = [500 - minLX, 0];
            let position = initialPotition;
            let finalPosition;
            while (position = testBlocksUnder(position, mapo)) {
                finalPosition = position
            }
            if (!finalPosition) {
                console.error('absoltue')
                mapo[initialPotition[1]][initialPotition[0]] = 'o'
                throw 'finished'
            } else {

                mapo[finalPosition[1]][finalPosition[0]] = 'o'
            }
        }

        let i;
        try {
            for (i = 0; i < 55000; i++) {
                fallUnitlStop();
            }
        } catch (error) {

        }
        console.log('received data: \n', mapo.map(t => t.join('')).join('\n'), i + 1)

    } else {
        console.log(err);
    }
});
