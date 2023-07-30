var fs = require('fs'),
    path = require('path'),
    filePath = path.join(__dirname, 'input.txt');

fs.readFile(filePath, { encoding: 'utf-8' }, function (err, data) {
    if (!err) {

        const mapy = data
            .split('\n')
            .filter(t => !!t)
            .map(t => t.split(''))

        let visibleTrees = mapy.map(t => t.map(t => false))

        for (let i = 0; i < mapy.length; i++) {
            const line = mapy[i];
            let leftTrees = [];
            for (let column = 0; column < line.length; column++) {
                const tree = line[column];
                leftTrees.some(t => t >= tree) ? '' : visibleTrees[i][column] = true;
                leftTrees.push(tree)
            }
        }

        for (let i = 0; i < mapy[0].length; i++) {
            let topTrees = [];
            for (let line = 0; line < mapy.length; line++) {
                const tree = mapy[line][i];
                topTrees.some(t => t >= tree) ? '' : visibleTrees[line][i] = true;
                topTrees.push(tree)
            }
        }

        for (let i = 0; i < mapy[0].length; i++) {
            let downTrees = [];
            for (let line = mapy.length - 1; line >= 0; line--) {
                const tree = mapy[line][i];
                downTrees.some(t => t >= tree) ? '' : visibleTrees[line][i] = true;
                downTrees.push(tree)
            }
        }
        for (let i = 0; i < mapy.length; i++) {
            const line = mapy[i];
            let rightTrees = [];
            for (let column = line.length - 1; column >= 0; column--) {
                const tree = line[column];
                rightTrees.some(t => t >= tree) ? '' : visibleTrees[i][column] = true;
                rightTrees.push(tree)
            }
        }
        let visibleTreesCount = 0
        visibleTrees.forEach(t => t.forEach(v => v && visibleTreesCount++))

        console.log('received data: ', visibleTreesCount);
    } else {
        console.log(err);
    }
});
