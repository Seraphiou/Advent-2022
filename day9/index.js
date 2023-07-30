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

        let mapo = [...Array(1000).keys()]
            .map(t => {
                return [...Array(1000).keys()].map(t => ' . ')
            })
        console.log('a\n' + mapo.map(t => t.join('')).join('\n'))
        let snakePositions = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]
        let tailPositions = [[0, 0]]
        const moveHead = ([direction, steps]) => {
            let step;
            switch (direction) {
                case 'U':
                    step = [0, 1]
                    break;
                case 'D':
                    step = [0, -1]
                    break;
                case 'L':
                    step = [-1, 0]
                    break;
                case 'R':
                    step = [1, 0]
                    break;
                default:
                    break;
            }
            for (let i = 0; i < steps; i++) {
                snakePositions[0] = [snakePositions[0][0] + step[0], snakePositions[0][1] + step[1]]
                snakePositions.forEach((_, i) => i > 0 && moveTail(i))
                //console.log('sp', snakePositions)
            }
        }
        const moveTail = (index) => {
            const diffH = snakePositions[index - 1][0] - snakePositions[index][0];
            const diffV = snakePositions[index - 1][1] - snakePositions[index][1];
            if (diffH <= 1 && diffH >= -1 && diffV <= 1 && diffV >= -1) {
            } else {
                if (Math.abs(diffH) === 2 && Math.abs(diffV) === 2) {
                    snakePositions[index] = [snakePositions[index - 1][0] - (diffH / 2), snakePositions[index - 1][1] - (diffV / 2)]
                    index === 9 && console.log('added position tail 22', snakePositions[index], snakePositions[index - 1])
                } else {
                    switch (diffH) {
                        case 2:
                            snakePositions[index] = [snakePositions[index - 1][0] - 1, snakePositions[index - 1][1]]
                            break;
                        case -2:
                            snakePositions[index] = [snakePositions[index - 1][0] + 1, snakePositions[index - 1][1]]
                            break;
                        default:
                            break;
                    }
                    switch (diffV) {
                        case 2:
                            snakePositions[index] = [snakePositions[index - 1][0], snakePositions[index - 1][1] - 1]
                            break;
                        case -2:
                            snakePositions[index] = [snakePositions[index - 1][0], snakePositions[index - 1][1] + 1]
                            break;
                        default:
                            break;
                    }
                }
                if (index === 9) {
                    //console.log('test', snakePositions[index])
                    if (tailPositions.some(([x, y]) => (snakePositions[index][0] === x) && (snakePositions[index][1] === y))) {

                    } else {
                        tailPositions.push(snakePositions[index]);

                        //console.log('added position tail', snakePositions[index], snakePositions[index - 1])
                    }
                }
            }
        }


        mapy.map(t => moveHead(t))

        let finalMap = mapo.map((t, i) => t.map((t, j) => '_'))
        tailPositions.forEach(([i, j]) => finalMap[i + 500][j + 500] = 'X')
        fs.writeFile('./test.txt', finalMap.map(t => t.join('')).join('\n'), err => {
            if (err) {
                console.error(err);
            }
            // fichier écrit avec succès
        });
        console.log('received data: ', tailPositions.length);
    } else {
        console.log(err);
    }
});
