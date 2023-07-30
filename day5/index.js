var fs = require('fs'),
    path = require('path'),
    filePath = path.join(__dirname, 'input.txt');

fs.readFile(filePath, { encoding: 'utf-8' }, function (err, data) {
    if (!err) {

        const splet
            = data
                .split('\n\n')
                .filter(t => !!t);
        const repartition = splet[0];
        let repartitionArray = [];
        repartition.split('\n').slice(0, -1)
            .forEach(
                t => {
                    repartitionArray[0] = [...(repartitionArray[0] || []), t[1]]
                    repartitionArray[1] = [...(repartitionArray[1] || []), t[5]]
                    repartitionArray[2] = [...(repartitionArray[2] || []), t[9]]
                    repartitionArray[3] = [...(repartitionArray[3] || []), t[13]]
                    repartitionArray[4] = [...(repartitionArray[4] || []), t[17]]
                    repartitionArray[5] = [...(repartitionArray[5] || []), t[21]]
                    repartitionArray[6] = [...(repartitionArray[6] || []), t[25]]
                    repartitionArray[7] = [...(repartitionArray[7] || []), t[29]]
                    repartitionArray[8] = [...(repartitionArray[8] || []), t[33]]
                })
        repartitionArray = repartitionArray.map(t => t.reverse().filter(a => a !== ' '))
        const movesRaw = splet[1];
        const moves = movesRaw.split('\n').filter(a => a).map(p => p.split(/from | to |move /g).filter((_, i) => i).map(t => Number(t)))
        moves.forEach(a => {
            const array = repartitionArray[a[1] - 1];
            const movingpart = array.slice(array.length - a[0]);
            repartitionArray[a[2] - 1] = [...repartitionArray[a[2] - 1], ...movingpart.reverse()];
            repartitionArray[a[1] - 1] = array.slice(0, array.length - a[0]);
            
        }
        )
        console.log('received data: ', repartitionArray.map(t=>t.pop()).join(''));

    } else {
        console.log(err);
    }
});
