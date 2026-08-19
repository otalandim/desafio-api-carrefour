# Desafio de Automação de Testes de API - Carrefour

## Contexto

Este projeto contém a automação de testes da API RESTful sugerida (ServeRest) que gerencia usuários, cumprindo o desafio técnico.

## Tecnologias Utilizadas

* **Node.js**
* **Jest**: Framework de testes e asserções.
* **Supertest**: Biblioteca para requisições HTTP.
* **Jest HTML Reporter**: Geração de relatórios visuais.
* **GitHub Actions**: Pipeline de CI/CD.

## Como Executar

1. Clone o repositório:
   `git clone <URL_DO_SEU_REPO>`
2. Instale as dependências:
   `npm install`
3. Execute os testes no terminal:
   `npm test`

## Casos de Testes

O conjunto de testes automatizados cobre o "Caminho Feliz" e cenários de exceção (Testes Negativos):
- **Autenticação e validação de rotas protegidas.**
- **Criação de usuários com sucesso e validação de campos obrigatórios (nome, email, password, administrador).**
- **Tentativa de criação/atualização utilizando e-mails já cadastrados na base de dados.**
- **Validação de esquema (schema) ao buscar ou alterar usuários com IDs em formatos inválidos.**
- **Listagem de todos e busca específica de usuários por ID.**
- **Exclusão lógica de usuários e tratamento de exclusão de IDs inexistentes.**
