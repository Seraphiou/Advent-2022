const { time } = require('console');

var fs = require('fs'),
    path = require('path'),
    filePath = path.join(__dirname, 'input.txt');

fs.readFile(filePath, { encoding: 'utf-8' }, function (err, data) {
    if (!err) {


        let monkeys = [{
            items: [57, 58],
            operation: a => a * 19n,
            test: a => a % 7n === 0n,
            truely: 2,
            falsy: 3,
            inspectedItems: 0
        }, {
            items: [66, 52, 59, 79, 94, 73],
            operation: a => a + 1n,
            test: a => a % 19n === 0n,
            truely: 4,
            falsy: 6,
            inspectedItems: 0
        }, {
            items: [80],
            operation: a => a + 6n,
            test: a => a % 5n === 0n,
            truely: 7,
            falsy: 5,
            inspectedItems: 0
        }, {
            items: [82, 81, 68, 66, 71, 83, 75, 97],
            operation: a => a + 5n,
            test: a => a % 11n === 0n,
            truely: 5,
            falsy: 2,
            inspectedItems: 0
        }, {
            items: [55, 52, 67, 70, 69, 94, 90],
            operation: a => a * a,
            test: a => a % 17n === 0n,
            truely: 0,
            falsy: 3,
            inspectedItems: 0
        }, {
            items: [69, 85, 89, 91],
            operation: a => a + 7n,
            test: a => a % 13n === 0n,
            truely: 1,
            falsy: 7,
            inspectedItems: 0
        }, {
            items: [75, 53, 73, 52, 75],
            operation: a => a * 7n,
            test: a => a % 2n === 0n,
            truely: 0,
            falsy: 4,
            inspectedItems: 0
        }, {
            items: [94, 60, 79],
            operation: a => a + 2n,
            test: a => a % 3n === 0n,
            truely: 1,
            falsy: 6,
            inspectedItems: 0
        }]
        const limiter = 3n * 2n * 13n * 17n * 11n * 5n * 19n * 7n;
        monkeys = monkeys.map(t => ({ ...t, items: t.items.map(t => BigInt(t)) }))

        const monkeyInspect = (monkey) => {
            monkey.items.map(t => {
                monkey.items = monkey.items.filter(a => a !== t)
                return monkey.operation(t);
            }).map(t => t % limiter).forEach(t => {
                monkey.inspectedItems += 1
                monkeys[monkey.test(t) ? monkey.truely : monkey.falsy].items.push(t);
            })
        }
        const doOneTurn = () => {
            return monkeys.forEach(t => monkeyInspect(t));
        }
        [...new Array(10000)].forEach(t => doOneTurn());

        console.log('received data: ', monkeys.map(t=>t.inspectedItems), monkeys.map(t => t.items.length));
    } else {
        console.log(err);
    }
});
