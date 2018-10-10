const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server/app.js');

const should = chai.should();
chai.use(chaiHttp);

describe('api routes', () => {
  let server;
  before(() => { server = app.listen() });
  after(() => { server.close() });

  it('should respond with users to GET /api/v1/users', done => {
    chai.request(server)
      .post('/login')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify({ email: 'darth.vader@gmail.com', password: 'anakin' }))
      .end((err, res) => {
        const token = res.body.data.token;
        chai.request(server)
          .get('/api/v1/users')
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
          .set('Authorization', 'Bearer ' + token)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('status').equal('success');
            res.body.data.should.have.property('Items');
            res.body.data.Items.should.be.an('array');
            done();
          });
      });
  });

  it('should throw if not authenticated on GET /api/v1/users', done => {
    chai.request(server)
      .get('/api/v1/users')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        // should.exist(err);
        res.status.should.eql(401);
        res.type.should.eql('application/json');
        res.body.status.should.eql('error');
        res.text.should.eql('{"status":"error","statusCode":401,"message":"Authentication Error"}');
        done();
      });
  });

});