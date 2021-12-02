import getPosition, { getPositionWithAim } from '../getPosition';

test('getPosition correctly calculates horizontal position times depth', () => {
    const data = ['forward 5', 'down 5', 'forward 8', 'up 3', 'down 8', 'forward 2'];

    expect(getPosition(data)).toBe(150);
});

test('getPosition correctly calculates horizontal position times depth when position is 0', () => {
    const data = ['up 1', 'down 1'];

    expect(getPosition(data)).toBe(0);
});

test('getPosition correctly calculates answer when no commands', () => {
    const data = [];

    expect(getPosition(data)).toBe(0);
});

test('getPositionWithAim correctly calculates answer', () => {
    const data = ['forward 5', 'down 5', 'forward 8', 'up 3', 'down 8', 'forward 2'];

    expect(getPositionWithAim(data)).toBe(900);
});