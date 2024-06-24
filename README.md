# API REST Usando GraphQL e Rest.js

## Setup

Nessa aplicação, usaremos TypeScript juntamente com o framework Nest.js, sendo necessário garantir que os mesmos estejam instalados, mais algumas bibliotecas que o acompanham. 

Para isso, usaremos o gerenciador de pacotes NPM. Entre no diretório ```.\restapi-exercise\``` e rode o comando abaixo para instalar as dependências:

```bash
npm install
```
Tenha certeza que todas os pacotes foram devidamente instalados.

Após instalar as dependências, mude as credenciais no arquivo .env para as de um banco de dados postgresSQL local que você terá que criar:

```bash
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=myuser
DB_PASSWORD=mypassword
DB_DATABASE=test
```

## Iniciar a aplicação

Para iniciar a aplicação, rode o comando  

```bash
nest start
```

## Teste do CRUD no GraphQL

Com a aplicação rodando, acesse o ```http://localhost:3000/graphql``` para entrar no GraphQL Playground. Nele, você poderá rodar todas as operações, de Criar, deletar, atualizar e acessar um usuário.


Criar um usuário:
```bash
mutation {
  createUser(createUserInput: { name: "John Doe", email: "john.doe@example.com", password: "password123" }) {
    id
    name
    email
  }
}
```

Buscar todos os usuários:
```bash
query {
  users {
    id
    name
    email
  }
}
```

Buscar um usuário pelo ID:
```bash
query {
  user(id: 1) {
    id
    name
    email
  }
}
```

Atualizar um usuário:
```bash
mutation {
  updateUser(id: 1, name: "John Smith", email: "john.smith@example.com") {
    id
    name
    email
  }
}
```

Remover um usuário:
```bash
mutation {
  removeUser(id: 1)
}
```

## Teste da autenticação de um usuário

Também foi implementada a função de autenticação, usando Passport.js, JWT e Bcrypt.js (para hashear as senhas dos usuários). Teste as rotas de registro e login usando Postman.

Registrar um novo usuário:

- Método: POST
- URL: ```http://localhost:3000/auth/register```
- Body (JSON):

```bash
{
  "name": "Jane Doe",
  "email": "jane.doe@example.com",
  "password": "password123"
}
```
Fazer login:

- Método: POST
- URL: ```http://localhost:3000/auth/login```
- Body (JSON):

```bash
{
  "email": "jane.doe@example.com",
  "password": "password123"
}
```
Verifique a resposta de login:

A resposta deve incluir um token JWT, que pode ser usado para autenticar outras requisições.

## Testes unitários

Também foi criado testes unitários para cada operação CRUD, usando o Jest. É possível rodar esses testes entrando na pasta ```.\graphql-exercise\``` e rodando o comando:

```bash
npm run test
```

Também é possível rodar os comandos```npm run test:watch``` e ```npm run test:cov``` para maior precisão e análise.
