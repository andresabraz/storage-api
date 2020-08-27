const request = require('supertest');

const app = require('../../src/app');
const factory = require('../factories');
const truncate = require('../utils/truncate');
const httpStatus = require('http-status');

describe('Authentication', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('Should authenticate with valid credentials', async () => {
    const user = await factory.create('User', {
      password: '123',
    });

    const response = await request(app).post('/session').send({
      email: user.email,
      password: '123',
    });

    expect(response.status).toBe(httpStatus.OK);
  });

  it('Should NOT authenticate with invalid credentials', async () => {
    const user = await factory.create('User', {
      password: '123456',
    });

    const response = await request(app).post('/session').send({
      email: user.email,
      password: '123',
    });

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('Should receive JWT token when authenticated', async () => {
    const user = await factory.create('User', {
      password: '123456',
    });

    const response = await request(app).post('/session').send({
      email: user.email,
      password: '123456',
    });

    expect(response.body).toHaveProperty('token');
  });

  it('Should be able to access private routes when authenticated', async () => {
    const user = await factory.create('User', {
      password: '123456',
    });

    const response = await request(app)
      .get('/dashboard')
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(httpStatus.OK);
  });

  it('Should NOT be able to access private routes without JWT token', async () => {
    const response = await request(app).get('/dashboard');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('Should NOT be able to access private routes with invalid JWT token', async () => {
    const response = await request(app)
      .get('/dashboard')
      .set('Authorization', `Bearer 123456`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
});
