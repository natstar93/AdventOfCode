const getPowerConsumption = (diagnostics) => {
    const gammaIncidenceRate = diagnostics.reduce((acc, curr) => {
        const binaryVals = curr.split('');

        binaryVals.map((binaryVal, index) => {
            if(!acc[index]) acc[index] = 0;
            if(binaryVal === '1') {
                acc[index] += 1;
            }
        });
        return acc;
    }, {});

    const gammaBinary = Object.keys(gammaIncidenceRate).map(key => gammaIncidenceRate[key] > diagnostics.length / 2 ? 1 : 0).join('');
    const gammaDecimal = parseInt(gammaBinary, 2);
    const epsilonBinary = gammaBinary.split('').map(val => val === '1' ? '0' : '1').join('');
    const epsilonDecimal = parseInt(epsilonBinary, 2);

    return gammaDecimal * epsilonDecimal;
};

export const getRating = (diagnostics, filterVal) => {
    let filteredList = diagnostics;

    for(let i = 0; i < diagnostics[0].length; i++) {
        const occurrencesOfFilterVal = filteredList.reduce((acc, curr) => {
            const binaryVal = parseInt(curr.split('')[i]);
    
            return binaryVal === filterVal ? acc +=1 : acc;
        }, 0);

        const isFilterVal = filterVal ? occurrencesOfFilterVal >= (filteredList.length / 2) : occurrencesOfFilterVal <= (filteredList.length / 2);

        const desiredVal = isFilterVal ? filterVal : Math.abs(filterVal - 1);
    
        filteredList = filteredList.filter(diagnostic => parseInt(diagnostic.split('')[i]) === desiredVal);

        if(filteredList.length === 1) return parseInt(filteredList[0], 2);;
    }
}

export const getLifeSupportRating = (data) => getRating(data, 1) * getRating(data, 0);

export default getPowerConsumption;