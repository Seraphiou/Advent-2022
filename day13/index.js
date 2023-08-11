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

        const mapy = data
            .split('\n\n')
            .filter(t => !!t)
            .map(t => t.split('\n').filter(t => !!t).map(t => JSON.parse(`{"a":${t}}`).a))

        result = mapy.map((element, internalIndex) => {
            let realIndex = internalIndex + 1;
            const res = comparatoring(element[0], element[1]);
            res === undefined && console.log('comparing ', element[0], element[1])
            return [realIndex, res]
        });
        console.log('received data: ', result, result.reduce((u, [ind, res]) => {
            return u + (res ? ind : 0);
        }, 0));
    } else {
        console.log(err);
    }
});
