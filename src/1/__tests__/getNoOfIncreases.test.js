import getNoOfIncreases from '../getNoOfIncreases';

test('getNoOfIncreases correctly calculates no of increases in a data set', () => {
    const mixedData = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];
    const decreasingData = [3, 2, 1];
    const increasingData = [1, 2, 3];
    
    expect(getNoOfIncreases(mixedData)).toBe(7);
    expect(getNoOfIncreases(decreasingData)).toBe(0);
    expect(getNoOfIncreases(increasingData)).toBe(2);
    expect(getNoOfIncreases([])).toBe(0);
});

test('getNoOfIncreases with interval 3 correctly calculates no of increases in a data set', () => {
    const mixedData = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];
    const decreasingData = [5, 4, 3, 2, 1];
    const increasingData = [1, 2, 3, 4];
    
    expect(getNoOfIncreases(mixedData, 3)).toBe(5);
    expect(getNoOfIncreases(decreasingData, 3)).toBe(0);
    expect(getNoOfIncreases(increasingData, 3)).toBe(1);
    expect(getNoOfIncreases([1, 2, 3], 3)).toBe(0);
    expect(getNoOfIncreases([], 3)).toBe(0);
});
