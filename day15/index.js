/*const sensorBeacon = [[[2, 18], [-2, 15]],
[[9, 16], [10, 16]],
[[13, 2], [15, 3]],
[[12, 14], [10, 16]],
[[10, 20], [10, 16]],
[[14, 17], [10, 16]],
[[8, 7], [2, 10]],
[[2, 0], [2, 10]],
[[0, 11], [2, 10]],
[[20, 14], [25, 17]],
[[17, 20], [21, 22]],
[[16, 7], [15, 3]],
[[14, 3], [15, 3]],
[[20, 1], [15, 3]]];*/
/* const sensorBeacon = [[[3844106, 3888618], [3225436, 4052707]],
[[1380352, 1857923], [10411, 2000000]],
[[272, 1998931], [10411, 2000000]],
[[2119959, 184595], [2039500, -250317]],
[[1675775, 2817868], [2307516, 3313037]],
[[2628344, 2174105], [3166783, 2549046]],
[[2919046, 3736158], [3145593, 4120490]],
[[16, 2009884], [10411, 2000000]],
[[2504789, 3988246], [3145593, 4120490]],
[[2861842, 2428768], [3166783, 2549046]],
[[3361207, 130612], [2039500, -250317]],
[[831856, 591484], [175938, 1260620]],
[[3125600, 1745424], [3166783, 2549046]],
[[21581, 3243480], [10411, 2000000]],
[[2757890, 3187285], [2307516, 3313037]],
[[3849488, 2414083], [3166783, 2549046]],
[[3862221, 757146], [4552923, 1057347]],
[[3558604, 2961030], [3166783, 2549046]],
[[3995832, 1706663], [4552923, 1057347]],
[[1082213, 3708082], [2307516, 3313037]],
[[135817, 1427041], [175938, 1260620]],
[[2467372, 697908], [2039500, -250317]],
[[3448383, 3674287], [3225436, 4052707]]]; */
var fs = require('fs'),
    path = require('path'),
    filePath = path.join(__dirname, 'input.txt');
fs.readFile(filePath, { encoding: 'utf-8' }, function (err, data) {
    if (!err) {

        const sensorBeacon = data
            .split('\n')
            .filter(t => !!t)
            .map(t => t.substring(12).split(/\, y\=|\: closest beacon is at x\=/g).map(t => Number(t))).map(([a, b, c, d]) => ([[a, b], [c, d]]));
        let res = [];
        for (let i = 0; i < 4000000; i++) {
            let coveredSegments = [];
            const limit = i;
            sensorBeacon.forEach(([[xS, yS], [xB, yB]]) => {
                const distanceBToS = Math.abs(xS - xB) + Math.abs(yS - yB)
                const distanceSTolimit = Math.abs(limit - yS);
                const remainingDistanceAfterLimit = distanceBToS - distanceSTolimit;
                if (remainingDistanceAfterLimit >= 0) {
                    coveredSegments.push([xS - remainingDistanceAfterLimit, xS + remainingDistanceAfterLimit])
                }
            })
            const addSegments = (a, b) => {
                if (b[0] >= a[0] && b[0] <= a[1]) { return [a[0], Math.max(a[1], b[1])] }
                if (b[1] >= a[0] && b[1] <= a[1]) {
                    return [Math.min(a[0], b[0]), a[1]]
                }
                return false
            }
            const sumSegments = (segs) => {
                let items = [...segs]
                let result = []
                for (let i = 0; i < segs.length; i++) {
                    const element = items.pop()
                    items.some(t => addSegments(t, element)) ? items = items.map(t => addSegments(t, element) || t) : result.push(element)
                }
                return [...result]
            }

            coveredSegments.sort((a, b) => a[0] - b[0])

            const resuLine = sumSegments(coveredSegments);
            resuLine.length > 1 && 
            res.push([resuLine, i, coveredSegments.map(t => t.join('|')).join('||')])
        }

        console.log('res', JSON.stringify(res));
    }
})




