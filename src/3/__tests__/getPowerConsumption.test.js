import getPowerConsumption, { getRating, getLifeSupportRating } from '../getPowerConsumption';

const testData = [
    '00100',
    '11110',
    '10110',
    '10111',
    '10101',
    '01111',
    '00111',
    '11100',
    '10000',
    '11001',
    '00010',
    '01010'
];
test('getPowerConsumption correctly calculates power consumption with binaries of 5 length', () => {
    expect(getPowerConsumption(testData)).toBe(198);
});

test('getPowerConsumption correctly calculates power consumption with binaries of 5 length', () => {
    const data = [
        '001001111010',
    ];

    expect(getPowerConsumption(data)).toBe(2194274);
});

test('getRating correctly calculates O2 rating', () => {
    expect(getRating(testData, 1)).toBe(23);
});

test('getRating correctly calculates CO2 rating', () => {
    expect(getRating(testData, 0)).toBe(10);
});

test('getLifeSupportRating correctly calculates life support rating', () => {
    expect(getLifeSupportRating(testData)).toBe(230);
});
