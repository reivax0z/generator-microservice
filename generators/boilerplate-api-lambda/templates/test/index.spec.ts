const lambda = require('@root/index');
const myService = require('@services/myService');

describe('index', () => {

  test(
    'can import the lamdba',
    () => {
      expect(lambda).not.toBeNull();
    });

  test(
    '#handler - should return 200 upon success',
    (done) => {
      const event = {
        headers: {
          'content-type': 'application/json',
          'ds-correlation-id': '12345',
        },
        body: {
          mailboxName: 'client@telstra.com',
        },
        path: '/v1/my-service',
        httpMethod: 'POST',
      };

      const myServiceSpy = spyOn(
        myService,
        'myFunction').and.callFake((input) => {
        return Promise.resolve();
      });

      lambda.handler(event, {}, (err, res) => {
        expect(myServiceSpy).toHaveBeenCalled();

        expect(res.statusCode).toBe(200);

        const body = JSON.parse(res.body);
        expect(body.correlationId).toBe('12345');
        expect(body.status).toBe(200);
        expect(body.time).not.toBeNull();
        expect(body.data).toBe('OK');

        done();
      });
    });

  test(
    '#handler - should return 200 upon success - generates correlationId if missing',
    (done) => {
      const event = {
        headers: {
          'content-type': 'application/json',
        },
        body: {
          mailboxName: 'client@telstra.com',
        },
        path: '/v1/my-service',
        httpMethod: 'POST',
      };

      const myServiceSpy = spyOn(
        myService,
        'myFunction').and.callFake((input) => {
        return Promise.resolve();
      });

      lambda.handler(event, {}, (err, res) => {
        expect(myServiceSpy).toHaveBeenCalled();

        expect(res.statusCode).toBe(200);

        const body = JSON.parse(res.body);
        expect(body.correlationId).not.toBeNull();
        expect(body.status).toBe(200);
        expect(body.time).not.toBeNull();
        expect(body.data).toBe('OK');

        done();
      });
    });

  test(
    '#handler - should return 500 upon error',
    (done) => {
      const event = {
        headers: {
          'content-type': 'application/json',
          'ds-correlation-id': '12345',
        },
        body: {
          mailboxName: 'client@telstra.com',
        },
        path: '/v1/my-service',
        httpMethod: 'POST',
      };

      const myServiceSpy = spyOn(
        myService,
        'myFunction').and.callFake((input) => {
        return Promise.reject('Something happened');
      });

      lambda.handler(event, {}, (err, res) => {
        expect(myServiceSpy).toHaveBeenCalled();

        expect(res.statusCode).toBe(500);

        const body = JSON.parse(res.body);
        expect(body.correlationId).toBe('12345');
        expect(body.status).toBe(500);
        expect(body.time).not.toBeNull();
        expect(body.errors.length).toBe(1);
        expect(body.errors[0].code).toBe('500101');
        expect(body.errors[0].message).toBe('Internal Server Error');

        done();
      });
    });
});
