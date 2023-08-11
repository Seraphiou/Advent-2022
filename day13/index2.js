const { time } = require('console');

var fs = require('fs'),
    path = require('path'),
    filePath = path.join(__dirname, 'input.txt');

const comparatoring = (a, b) => {
    if (typeof a === 'number' && typeof b === 'number') {
        if (a > b) {
            return false;
        }
        if (b > a) {
            return true;
        }
    }
    if (Array.isArray(a) && Array.isArray(b)) {
        for (let index = 0; index < Math.max(a.length, b.length); index++) {
            const elementA = a[index];
            const elementB = b[index];
            if (elementA === undefined && elementB === undefined) {
            } else {
                if (elementA === undefined) {
                    return true
                }
                if (elementB === undefined) {
                    return false
                }
                const resulty = comparatoring(elementA, elementB);
                if (resulty !== undefined) return resulty
            }
        }
    }
    if (!Array.isArray(a) && Array.isArray(b)) {
        const resulty = comparatoring([a], b)
        if (resulty !== undefined) return resulty
    }
    if (Array.isArray(a) && !Array.isArray(b)) {
        const resulty = comparatoring(a, [b])
        if (resulty !== undefined) return resulty
    }
}
fs.readFile(filePath, { encoding: 'utf-8' }, function (err, data) {
    if (!err) {

        let mapy = data
            .split('\n\n')
            .filter(t => !!t)
            .flatMap(t =>
                t
                    .split('\n')
                    .filter(t => !!t)
                    .map(t =>
                        JSON.parse(`{"a":${t}}`).a
                    )
            )
        const two = [[2]];
        mapy.push(two)
        const six = [[6]];
        mapy.push(six)
        let map2 = mapy.sort((a, b) => comparatoring(a, b) ? -1 : 1);
        console.log('received data: ', (mapy.indexOf(two) + 1) * (mapy.indexOf(six) + 1));
    } else {
        console.log(err);
    }
});
