import { echo } from '../src';

describe('Program', () => {
    test('Should Run', () => {
        // Act
        const result = echo('World');

        // Assert
        expect(result).toBe('Hello, World!');
    });
});
