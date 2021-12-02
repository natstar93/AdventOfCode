const getPosition = (commands) => {
    let depth = 0;
    let horizontalPos = 0;

    for(let i = 0; i < commands.length; i++) {
        const [ direction, distanceCommand ] = commands[i].split(' ');
        const distance = parseInt(distanceCommand);

        if(direction === 'forward') {
            horizontalPos += distance;
        } else if(direction === 'down') {
            depth += distance;
        } else if(direction === 'up') {
            depth -= distance;  
        }
    }

    return depth * horizontalPos;
};

export const getPositionWithAim = (commands) => {
    let depth = 0;
    let horizontalPos = 0;
    let aim = 0;

    for(let i = 0; i < commands.length; i++) {
        const [ direction, distanceCommand ] = commands[i].split(' ');
        const distance = parseInt(distanceCommand);

        if(direction === 'forward') {
            horizontalPos += distance;
            depth += (distance * aim)
        } else if(direction === 'down') {
            aim += distance;
        } else if(direction === 'up') {
            aim -= distance;  
        }
    }

    return depth * horizontalPos;
}

export default getPosition;