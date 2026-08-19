const request = require('supertest');
const { baseURL } = require('../config/env');

class UserService {
  constructor() {
    this.api = request(baseURL);
  }

  async login(email, password) {
    return this.api.post('/login').send({ email, password });
  }

  async create(payload) {
    return this.api.post('/usuarios').send(payload);
  }

  async getAll() {
    return this.api.get('/usuarios');
  }

  async getById(id) {
    return this.api.get(`/usuarios/${id}`);
  }

  async update(id, payload, token) {
    return this.api
      .put(`/usuarios/${id}`)
      .set('Authorization', token)
      .send(payload);
  }

  async delete(id, token) {
    return this.api
      .delete(`/usuarios/${id}`)
      .set('Authorization', token);
  }
}

module.exports = new UserService();