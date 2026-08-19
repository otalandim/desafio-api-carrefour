const UserService = require('../src/services/UserService.js');
const { generateUserPayload } = require('../src/utils/dataHelper.js');

describe('API de Usuários - Operações CRUD', () => {
  let token;
  let userId;
  let adminUserPayload = generateUserPayload('true');

  beforeAll(async () => {
    await UserService.create(adminUserPayload);

    const loginResponse = await UserService.login(adminUserPayload.email, adminUserPayload.password);
    token = loginResponse.body.authorization;
  });

  describe('POST /usuarios', () => {
    it('Deve criar um novo usuário com sucesso', async () => {
      const newUser = generateUserPayload('false');
      
      const response = await UserService.create(newUser);

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Cadastro realizado com sucesso');
      expect(response.body).toHaveProperty('_id');
      
      userId = response.body._id; 
    });

    it('Deve retornar erro ao tentar criar usuário faltando campos obrigatórios', async () => {
      const invalidUser = { nome: "Falta Informação" };

      const response = await UserService.create(invalidUser);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('email', 'email é obrigatório');
      expect(response.body).toHaveProperty('password', 'password é obrigatório');
    });

    it('Deve retornar erro ao tentar cadastrar um e-mail já existente', async () => {
      const response = await UserService.create(adminUserPayload);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Este email já está sendo usado');
    });
  });

  describe('GET /usuarios', () => {
    it('Deve retornar uma lista de todos os usuários', async () => {
      const response = await UserService.getAll();

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('quantidade');
      expect(Array.isArray(response.body.usuarios)).toBe(true);
    });

    it('Deve retornar usuário filtrado por Query Parameters (email)', async () => {
      const response = await UserService.api.get(`/usuarios?email=${adminUserPayload.email}`);

      expect(response.status).toBe(200);
      expect(response.body.quantidade).toBe(1);
      expect(response.body.usuarios[0].email).toBe(adminUserPayload.email);
    });
  });

  describe('GET /usuarios/{id}', () => {
    it('Deve retornar os detalhes de um usuário específico', async () => {
      const response = await UserService.getById(userId);

      expect(response.status).toBe(200);
      expect(response.body._id).toBe(userId);
    });

    it('Deve retornar 400 para usuário não encontrado', async () => {
      const response = await UserService.getById('1234567890123456');

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Usuário não encontrado');
    });

    it('Deve retornar erro de validação ao buscar usuário com formato de ID inválido', async () => {
      const response = await UserService.getById('id_curto');

      expect(response.status).toBe(400);
      expect(response.body.id).toBe('id deve ter exatamente 16 caracteres alfanuméricos');
    });
  });

  describe('PUT /usuarios/{id}', () => {
    it('Deve atualizar as informações de um usuário', async () => {
      const updatedData = generateUserPayload('true');
      updatedData.nome = 'Nome Atualizado Automação';

      const response = await UserService.update(userId, updatedData, token);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Registro alterado com sucesso');
    });

    it('Deve cadastrar o usuário caso o ID não exista na base de dados', async () => {
      const newUserData = generateUserPayload('false');
      const idInexistente = '9999999999999999';

      const response = await UserService.update(idInexistente, newUserData, token);

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Cadastro realizado com sucesso');
    });

    it('Deve retornar erro ao tentar atualizar para um e-mail já existente noutra conta', async () => {
      const userB_Payload = generateUserPayload('false');
      await UserService.create(userB_Payload);

      const updatedData = generateUserPayload('true');
      updatedData.email = userB_Payload.email;

      const response = await UserService.update(userId, updatedData, token);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Este email já está sendo usado');
    });
  });

  describe('DELETE /usuarios/{id}', () => {
    it('Deve excluir um usuário com sucesso', async () => {
      const response = await UserService.delete(userId, token);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Registro excluído com sucesso');
    });

    it('Deve retornar mensagem apropriada ao tentar excluir usuário inexistente', async () => {
      const idInexistente = '8888888888888888';
      const response = await UserService.delete(idInexistente, token);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Nenhum registro excluído');
    });
  });
});