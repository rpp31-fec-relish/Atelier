const jestTest = require('./jestTest');

test('jestTest works', () => {
    expect(
        jestTest(1, 2)
    ).toBe(3);
})