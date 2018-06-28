// JEST TEST FILE

// we don't have to import anything (Jest is global)

// const add = (a, b) => a + b +1; // FAIL
const add = (a, b) => a + b; // PASS

const generateGreeting = (name = 'Anonymous') => `Hello ${name}!`;

test('should add two numbers', () => {
    const result = add(3, 4);
/*  // WE CAN SET OWN ERRORS MANUALLY:
    if(result !== 7) {
        throw new Error(`You added 4 and 3. The result was ${result}. Expect 7`);
    } */
    // WE CAN USE BUILD IN METHODS OF JEST TO MAKE TEST and throw automated errors:
    // https://facebook.github.io/jest/docs/en/api
    // https://facebook.github.io/jest/docs/en/expect
    expect(result).toBe(7); //build in methods of Jest
});

test('should alert Hello with name', () => {
    const result = generateGreeting('Lukas');
    expect(result).toBe('Hello Lukas!');
});
test('should alert Hello with default name', () => {
    const result = generateGreeting();
    expect(result).toBe('Hello Anonymous!');
});