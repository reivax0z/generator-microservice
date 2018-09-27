const request = require('supertest');

const server = require('@root/server');
const myService = require('@services/myService');

describe('server', () => {

  test(
    '#POST - should return 200 upon success',
    (done) => {
      const myServiceSpy = spyOn(
        myService,
        'myFunction').and.callFake((input) => {
        return Promise.resolve();
      });

      request(server.app).post('/v1/my-service')
        .set('ds-correlation-id', '12345')
        .send({
          mailboxName: 'client@telstra.com',
        })
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(myServiceSpy).toHaveBeenCalled();

          expect(res.statusCode).toBe(200);

          const body = res.body;
          expect(body.correlationId).toBe('12345');
          expect(body.status).toBe(200);
          expect(body.time).not.toBeNull();
          expect(body.data).toBe('OK');

          done();
        });
    });

  test(
    '#POST - should return 200 upon success - generates correlationId if missing',
    (done) => {
      const myServiceSpy = spyOn(
        myService,
        'myFunction').and.callFake((input) => {
        return Promise.resolve();
      });

      request(server.app).post('/v1/my-service')
        .send({
          mailboxName: 'client@telstra.com',
        })
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(myServiceSpy).toHaveBeenCalled();

          expect(res.statusCode).toBe(200);

          const body = res.body;
          expect(body.correlationId).not.toBeNull();
          expect(body.status).toBe(200);
          expect(body.time).not.toBeNull();
          expect(body.data).toBe('OK');

          done();
        });
    });

  test(
    '#POST - should return 500 upon error',
    (done) => {
      const myServiceSpy = spyOn(
        myService,
        'myFunction').and.callFake((input) => {
        return Promise.reject('Something happened');
      });

      request(server.app).post('/v1/my-service')
        .set('ds-correlation-id', '12345')
        .send({
          mailboxName: 'client@telstra.com',
        })
        .expect(500)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(myServiceSpy).toHaveBeenCalled();

          expect(res.statusCode).toBe(500);

          const body = res.body;
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
