var fs = require('fs'),
    path = require('path'),
    filePath = path.join(__dirname, 'input.txt');

fs.readFile(filePath, { encoding: 'utf-8' }, function (err, data) {
    if (!err) {

        const mapy = data
            .split('\n')
            .filter(t => !!t)
            .map(t => t.split(''))

        let visibleTrees = mapy.map(t => t.map(t => ([])))

        for (let i = 0; i < mapy.length; i++) {
            const line = mapy[i];
            for (let column = 0; column < mapy[0].length; column++) {
                const tree = line[column];
                let analysingTreeColumn = column - 1
                let leftVisibleTreesCount = 0
                while (analysingTreeColumn >= 0) {
                    ++leftVisibleTreesCount;
                    if (line[analysingTreeColumn] >= tree) {
                        break;
                    };
                    analysingTreeColumn--;
                }
                analysingTreeColumn = column + 1
                let rightVisibleTreesCount = 0
                while (analysingTreeColumn < line.length) {
                    ++rightVisibleTreesCount;
                    if (line[analysingTreeColumn] >= tree) {
                        break;
                    };
                    analysingTreeColumn++;
                }
                let topVisibleTreesCount = 0
                let analysingTreeline = i - 1
                while (analysingTreeline >= 0) {
                    ++topVisibleTreesCount;
                    if (mapy[analysingTreeline][column] >= tree) {
                        break;
                    };
                    analysingTreeline--;
                }

                analysingTreeline = i + 1
                let downVisibleTreesCount = 0
                while (analysingTreeline < mapy.length) {
                    ++downVisibleTreesCount;
                    if (mapy[analysingTreeline][column] >= tree) {
                        break;
                    };
                    analysingTreeline++;
                }
                visibleTrees[i][column] = leftVisibleTreesCount * rightVisibleTreesCount * topVisibleTreesCount * downVisibleTreesCount
            }
        }
        let max = visibleTrees.reduce((a, b) => Math.max(a, Math.max(...b)), 0)

        console.log('received data: ', max);
    } else {
        console.log(err);
    }
});
