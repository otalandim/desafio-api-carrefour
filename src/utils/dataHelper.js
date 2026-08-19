module.exports = {
  generateUserPayload: (isAdmin = 'true') => ({
    nome: 'Usuario Automação',
    email: `qa_tester_${Date.now()}@carrefour.com.br`,
    password: 'senha_segura_123',
    administrador: isAdmin
  })
};