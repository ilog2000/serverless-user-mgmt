const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server/app.js');

const should = chai.should();
chai.use(chaiHttp);

describe('home routes', () => {
  let server;
  before(() => { server = app.listen() });
  after(() => { server.close() });

  it('should respond to GET /ping', done => {
    chai.request(server)
      .get('/ping')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('should respond with a token to POST /login', done => {
    chai.request(server)
      .post('/login')
      .set('content-type', 'application/json')
      .send(JSON.stringify({ email: 'darth.vader@gmail.com', password: 'anakin' }))
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('status').equal('success');
        res.body.data.should.have.property('token');
        done();
      });
  });

});