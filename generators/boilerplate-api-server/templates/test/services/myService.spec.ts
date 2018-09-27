const service = require('@services/myService');

describe('myService', () => {

  test(
    'can import the service',
    () => {
      expect(service).not.toBeNull;
    });

  test(
    '#myFunction - should succeed',
    () => {
      const input = {
        correlationId: '12345',
        body: 'OK',
      };

      return service.myFunction(input);
    });

});
