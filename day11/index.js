const { time } = require('console');

var fs = require('fs'),
    path = require('path'),
    filePath = path.join(__dirname, 'input.txt');

fs.readFile(filePath, { encoding: 'utf-8' }, function (err, data) {
    if (!err) {


        let monkeys = [{
            items: [57, 58],
            operation: a => a * 19,
            test: a => a % 7 === 0,
            truely: 2,
            falsy: 3,
            inspectedItems: 0
        }, {
            items: [66, 52, 59, 79, 94, 73],
            operation: a => a + 1,
            test: a => a % 19 === 0,
            truely: 4,
            falsy: 6,
            inspectedItems: 0
        }, {
            items: [80],
            operation: a => a + 6,
            test: a => a % 5 === 0,
            truely: 7,
            falsy: 5,
            inspectedItems: 0
        }, {
            items: [82, 81, 68, 66, 71, 83, 75, 97],
            operation: a => a + 5,
            test: a => a % 11 === 0,
            truely: 5,
            falsy: 2,
            inspectedItems: 0
        }, {
            items: [55, 52, 67, 70, 69, 94, 90],
            operation: a => a * a,
            test: a => a % 17 === 0,
            truely: 0,
            falsy: 3,
            inspectedItems: 0
        }, {
            items: [69, 85, 89, 91],
            operation: a => a + 7,
            test: a => a % 13 === 0,
            truely: 1,
            falsy: 7,
            inspectedItems: 0
        }, {
            items: [75, 53, 73, 52, 75],
            operation: a => a * 7,
            test: a => a % 2 === 0,
            truely: 0,
            falsy: 4,
            inspectedItems: 0
        }, {
            items: [94, 60, 79],
            operation: a => a + 2,
            test: a => a % 3 === 0,
            truely: 1,
            falsy: 6,
            inspectedItems: 0
        }]

        const monkeyInspect = (monkey) => {
            monkey.items.map(t => {
                monkey.items = monkey.items.filter(a => a !== t)
                return monkey.operation(t);
            }).map(t => Math.floor(t / 3)).forEach(t => {
                monkey.inspectedItems += 1
                monkeys[monkey.test(t) ? monkey.truely : monkey.falsy].items.push(t);
            })
        }
        const doOneTurn = () => {
            console.log('turn')
            return monkeys.forEach(t => monkeyInspect(t));
        }
        [...new Array(20)].map(t => doOneTurn());

        console.log('received data: ', monkeys, monkeys.map(t => t.items.length));
    } else {
        console.log(err);
    }
});
