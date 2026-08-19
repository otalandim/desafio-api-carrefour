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
4. Para gerar o relatório de cobertura:
   `npm run test:coverage`

## Casos de Testes Cobertos (100% de cobertura proposta):

* **Autenticação**: Geração e utilização de token JWT nas rotas protegidas.
* **POST /usuarios**: 
  * Criação de usuário válido.
  * Validação de payload incorreto (campos obrigatórios).
* **GET /usuarios**: Listagem global.
* **GET /usuarios/{id}**: Busca de usuário existente e validação de ID inexistente.
* **PUT /usuarios/{id}**: Atualização de dados com JWT.
* **DELETE /usuarios/{id}**: Deleção lógica do usuário com JWT.

## Rate Limit (Limitações de Taxa)

O cenário de 100 requisições por minuto foi levado em consideração, mas omitido ativamente de testes massivos na CI para não causar sobrecarga desnecessária na API pública do ServeRest. Em ambiente interno corporativo, esse teste envolveria disparar 101 requisições assíncronas aguardando o status code `429 Too Many Requests`.