var fs = require('fs'),
    path = require('path'),
    filePath = path.join(__dirname, 'input2.txt');
fs.readFile(filePath, { encoding: 'utf-8' }, function (err, data) {
    if (!err) {
        let mapy = data
            .split('\n')
            .filter(t => !!t)
            .map(t => t.split(/Valve | has flow rate=|\; tunnels lead to valves |\; tunnel leads to valve /g).slice(1))
            .reduce((t, [a, b, c]) => ({ ...t, [a]: { id: a, pressure: Number(b), open: b === '0', joints: c.split(', ') } }), {})


        let entriets = [];
        const shortestPathFromTo = (a, b) => {
            if (a === b) return 0;
            let currentSteps = [a];
            let steps = 0;
            let found = false;
            while (!found) {
                steps++;
                currentSteps = currentSteps.flatMap(t => mapy[t].joints)
                if (currentSteps.includes(b)) { found = true }
            }
            return steps;
        }
        const calculatepossibleNextSteps = (currentPosition, time, pressure, totalPressure, mapa, previousPosition, alreadyAllOpen) => {
            totalPressure += pressure;
            if (time >= 30) {
                entriets.push(totalPressure);
                console.log('finished', currentPosition, time, pressure, totalPressure, mapa, previousPosition);
                return totalPressure;
            }
            if (alreadyAllOpen || Object.values(mapa).every(t => t.open)) {
                return calculatepossibleNextSteps(currentPosition, time + 1, pressure, totalPressure, mapa, undefined, true)
            }
            let valve = mapa[currentPosition]
            if (!valve.open) {
                calculatepossibleNextSteps(currentPosition, time + 1, pressure + valve.pressure, totalPressure, { ...mapa, [currentPosition]: { ...mapa[currentPosition], open: true } }, undefined)
            }
            valve.joints.filter(t => t !== previousPosition).forEach(t => calculatepossibleNextSteps(t, time + 1, pressure, totalPressure, mapa, currentPosition))

        }

        const distances = Object.keys(mapy)
            .flatMap(
                start =>
                    Object.keys(mapy)
                        .map(
                            end => ([start, {
                                end,
                                distance: shortestPathFromTo(start, end)
                            }])
                        )
            )
            .reduce((t, [a, b]) => ({ ...t, [a]: [...(t[a] || []), b] }), {});
        const calculateBestNextStepConditions = (remainingTime, currentStep, currentMap, distanceMap) => {
            const nextStepsByTotal = distanceMap[currentStep].map(a => [a.end, a.distance, (remainingTime - a.distance - 1) * currentMap[a.end].pressure])
            const nextStep = nextStepsByTotal.reduce((a, b) => b[2] > a[2] ? b : a, []);

            const nextRemainingTime = (remainingTime - nextStep[1] - 1);
            const nextCurrentStep = nextStep[0];
            const nextCurrentMap = { ...currentMap, [currentStep]: { ...currentMap[currentStep], pressure: 0 } }
            return [nextRemainingTime, nextCurrentStep, nextCurrentMap, distanceMap];
        }


        console.log('res', distances, calculateBestNextStepConditions(30, 'AA', mapy, distances));
    }
})



/*
const calculateBestPath = (position) => {
            const oneStepOptions = mapy.get(position)
                .joints
                .map(t => mapy.get(t))
                .filter(({ open }) => !open)
                .filter(({ pressure }) => pressure !== 0);
            console.log('set', oneStepOptions);
            const firstelement = oneStepOptions[0];
            if (oneStepOptions.length === 1) return [oneStepOptions[0]]
            if (firstelement && oneStepOptions.some(t => t.pressure !== firstelement.pressure)) {
                const maxPressure = Math.max(...oneStepOptions.map(({ pressure }) => pressure));
                return [oneStepOptions.find(({ pressure }) => pressure === maxPressure)]
            } else {
                const twoStepOptions = mapy.get(position)
                    .joints
                    .flatMap(t => mapy.get(t).joints.map(j => ({ step1: mapy.get(t), step2: mapy.get(j) })))
                    .filter(({ step2 }) => !step2.open)
                    .filter(({ step2 }) => step2.pressure !== 0);

                console.log('set2', twoStepOptions);
                const firstElementStep2 = twoStepOptions[0];
                if (twoStepOptions.length === 1) return [firstElementStep2.step1, firstElementStep2.step2]
                if (firstElementStep2 && twoStepOptions.some(t => t.step2.pressure !== firstElementStep2.step2.pressure)) {
                    const maxPressure = Math.max(...twoStepOptions.map(({ step2 }) => step2.pressure));
                    const foundPath = twoStepOptions.find(({ step2 }) => step2.pressure === maxPressure);
                    return [foundPath.step1, foundPath.step2]
                } else {
                    throw 'caca'
                }
            }

        }
        let currentStep = [];
        const moveOneMinute = () => {

            console.log('moving for ', currentStep);
            if (!currentStep.length) { time++; return; };
            let [step1, step2] = currentStep;
            if (position !== step1.id) {
                position = step1.id;
                console.log('moving to ', position);
                time++;
                return;
            } else {
                if (mapy.get(position).open) {
                    position = step2.id;
                    currentStep = step2 ? [step2] : [];
                    time++;
                    console.log('moving to ', position);
                } else {
                    mapy.get(position).open = true;
                    currentStep = step2 ? [step2] : [];
                    pressure += mapy.get(position).pressure
                    time++;
                    console.log('opening ', position);
                }
            }

        }
        while (time < 30) {
            if (currentStep.length) {
                currentStep = currentStep;
            } else {
                currentStep = calculateBestPath(position);
            }
            moveOneMinute()
        }*/