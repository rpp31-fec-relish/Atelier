import jestTest from '../jestTest.js';

describe('Jest Test', () => {
    it('works', () => {
      const wrapper = jestTest(1, 2);
      expect(wrapper).toEqual(3);
    });
  });