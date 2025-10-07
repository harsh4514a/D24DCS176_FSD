const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const mongoose = require('mongoose');
const app = require('../server'); // Export app from server.js for testing

chai.use(chaiHttp);

describe('Notes API', () => {
  let server;
  let createdNoteId;

  before((done) => {
    server = app.listen(4000, () => {
      console.log('Test server running on port 4000');
      done();
    });
  });

  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(() => {
        server.close(done);
      });
    });
  });

  it('should create a new note', (done) => {
    chai.request(server)
      .post('/notes')
      .send({ title: 'Test Note', content: 'This is a test note.' })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('_id');
        expect(res.body).to.have.property('title', 'Test Note');
        expect(res.body).to.have.property('content', 'This is a test note.');
        createdNoteId = res.body._id;
        done();
      });
  });

  it('should get all notes', (done) => {
    chai.request(server)
      .get('/notes')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.greaterThan(0);
        done();
      });
  });

  it('should get a note by id', (done) => {
    chai.request(server)
      .get(`/notes/${createdNoteId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('_id', createdNoteId);
        done();
      });
  });

  it('should update a note by id', (done) => {
    chai.request(server)
      .put(`/notes/${createdNoteId}`)
      .send({ title: 'Updated Title', content: 'Updated content.' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('title', 'Updated Title');
        expect(res.body).to.have.property('content', 'Updated content.');
        done();
      });
  });

  it('should delete a note by id', (done) => {
    chai.request(server)
      .delete(`/notes/${createdNoteId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message', 'Note deleted');
        done();
      });
  });

  it('should return 404 for non-existent note', (done) => {
    chai.request(server)
      .get('/notes/000000000000000000000000')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  it('should return 400 for invalid note creation', (done) => {
    chai.request(server)
      .post('/notes')
      .send({ content: 'Missing title' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
});
