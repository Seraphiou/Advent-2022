var fs = require('fs'),
    path = require('path'),
    filePath = path.join(__dirname, 'input.txt');

fs.readFile(filePath, { encoding: 'utf-8' }, function (err, data) {
    if (!err) {

        const mapy = data
            .split('\n')
            .filter(t => !!t)
        let folders = []
        let files = []
        let currentFolderPath = ''
        mapy.forEach(t => {

            if (t === '$ cd /') {
                folders.push('/');
                currentFolderPath = '/'
            } else if (t === '$ cd ..') {
                currentFolderPath = currentFolderPath.split('|').filter((a, i, arr) => i !== arr.length - 1).join('|');
            } else if (t.startsWith('$ cd ')) {
                currentFolderPath = currentFolderPath + '|' + t.slice(5)
                folders.find((path) => path === currentFolderPath) || folders.push(currentFolderPath);
            } else if (t === '$ ls') {
            } else if (t.startsWith('dir ')) {
            } else {
                files.push({ path: currentFolderPath + '+' + t.split(' ')[1], sizeB: Number(t.split(' ')[0]) })
            };

        })
        folderSizes = folders.map(t => ({ floderPath: t, sizeB: files.filter(({ path }) => path.includes(t)).map(t => t.sizeB).reduce((a, b) => a + b, 0) }))
        

        console.log('received data: ', folderSizes.filter(({ sizeB }) => sizeB < 100000).map(t => t.sizeB).reduce((a, b) => a + b, 0));
    } else {
        console.log(err);
    }
});
