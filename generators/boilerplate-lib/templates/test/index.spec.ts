const lib = require('@root/index');

describe('index', () => {

  test(
    'can import the lib',
    () => {
      expect(lib).not.toBeNull();
    });
});
