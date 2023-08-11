const { time } = require('console');
const { isTypedArray } = require('util/types');

var fs = require('fs'),
    path = require('path'),
    filePath = path.join(__dirname, 'input.txt');

fs.readFile(filePath, { encoding: 'utf-8' }, function (err, data) {
    if (!err) {

        const mapy = data
            .split('\n')
            .filter(t => !!t)
            .map(t => t.split(''))

        let mapo = {};
        mapy.forEach((t, i) => t.forEach((u, j) => mapo[u] = [...(mapo[u] || []), [i, j]]));

        const arrows =
            mapy.map((t, i) => t.map((u, j) => {
                let res = '';
                if (u === 'S') {
                    return 'v^  '
                    //return 'v>  '
                }
                if (u === 'E') {
                    return ' X  '
                }
                if (i < mapy.length - 1 && (mapy[i + 1][j]).charCodeAt(0) <= u.charCodeAt(0) + 1) {
                    if (mapy[i + 1][j] === 'E') {
                        mapy[i][j] === 'z' ? res += 'v' : res += ' '
                    } else {
                        res += 'v'
                    }
                } else { res += ' ' }
                if (i > 0 && (mapy[i - 1][j]).charCodeAt(0) <= u.charCodeAt(0) + 1) {
                    if (mapy[i - 1][j] === 'E') {
                        mapy[i][j] === 'z' ? res += '^' : res += ' '
                    } else {
                        res += '^'
                    }

                } else { res += ' ' }
                if (j > 0 && (mapy[i][j - 1]).charCodeAt(0) <= u.charCodeAt(0) + 1) {
                    if (mapy[i][j - 1] === 'E') {
                        mapy[i][j] === 'z' ? res += '<' : res += ' '
                    } else {
                        res += '<'
                    }
                } else { res += ' ' }
                if (j < mapy[0].length - 1 && (mapy[i][j + 1]).charCodeAt(0) <= u.charCodeAt(0) + 1) {
                    if (mapy[i][j + 1] === 'E') {
                        mapy[i][j] === 'z' ? res += '>' : res += ' '
                    } else {
                        res += '>'
                    }
                } else { res += ' ' }
                return res;
            }))


        const findPossibleNext = (distance, distances) => {

            distances.forEach((t, i) => t.forEach((u, j) => {
                if (u === distance) {
                    if (arrows[i][j].includes('v') && distances[i + 1][j] === undefined) {
                        distances[i + 1][j] = distance + 1
                    }
                    if (arrows[i][j].includes('^') && distances[i - 1][j] === undefined) {
                        distances[i - 1][j] = distance + 1
                    }
                    if (arrows[i][j].includes('<') && distances[i][j - 1] === undefined) {
                        distances[i][j - 1] = distance + 1
                    }
                    if (arrows[i][j].includes('>') && distances[i][j + 1] === undefined) {
                        distances[i][j + 1] = distance + 1
                    }
                }
            }
            ))
        }
        const calculateMinDistance = (i, j) => {
            console.log(`calculating distance from ${i} ${j}`)
            let distances =
                mapy.map((t, i2) => t.map((u, j2) => {
                    if (i === i2 && j === j2) return 0;
                    return undefined;
                }))
            for (let index = 0; index < 1000; index++) {
                findPossibleNext(index, distances);
            }
            mapy.forEach((t, i3) => t.forEach((u, j3) => u === 'E' && distances[i3][j3] && console.log(distances[i3][j3])))
        }
        mapy.forEach((
            t, i) => t.forEach((u, j) => {
                u === 'a' && calculateMinDistance(i, j)
            }
            )
        )
        console.log('received data: ');

    }
    else {
        console.log(err);
    }
});
