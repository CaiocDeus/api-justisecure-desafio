<h1> Desafio Técnico - Desenvolvedor Node.js / NestJS (Intermediário) </h1>

## Objetivo
<p>Construir uma API RESTful de gerenciamento de tarefas com autenticação JWT e boas práticas de arquitetura NestJS.</p>

## Stack obrigatória
- Node.js
- NestJS
- TypeScript
- PostgreSQL
- ORM (TypeORM ou Prisma)
- JWT
- Class-validator (validações)
- Jest (testes)

## Tecnologias Utilizadas
![Node.js](https://img.shields.io/badge/Node.js-417E38?style=for-the-badge&logo=node.js&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-73618F?style=for-the-badge&logo=mysql&logoColor=white)
![TypeORM](https://img.shields.io/badge/TypeORM-3A005D?style=for-the-badge&logo=typeorm&logoColor=white)
![Docker](https://img.shields.io/badge/docker-blue?style=for-the-badge&logo=docker)

<hr>

## 🎲 Banco de Dados

<p>
O banco de dados está estruturado da seguinte maneira:</p>

* Os ids são uuids
- users: id, username, password
- tasks: id, title, description, status, createdAt, updatedAt

<br>

## ✨ Funcionalidades
- Cadastro de usuário
- Login
- CRUD de tarefas

<p><strong>Observação</strong>: As rotas de tarefas exigem <strong>autenticação</strong></p>

<br>

## ⚙️ Executando a aplicação

Para executar o projeto localmente, siga os passos abaixo:

### Instalação

1. Clone o repositório:

```
 git clone https://github.com/CaiocDeus/api-justisecure-desafio.git
```

2. Vá para a pasta do projeto:

```
cd api-justisecure-desafio
```

3. Instale as dependências do projeto:

```
npm install
```

4. Configurar o arquivo de ambiente (.env):

```
cp .env.example .env
```

5. Suba os containers do projeto com o comando: (É preciso ter o Docker instalado)

```
docker-compose up -d
```

6. Após isso, você poderá fazer as requisições seguindo os passos da seção logo abaixo.

```
A aplicação por padrão estará funcionando na porta 3010.
```

<br>

## 📑 Documentação da API

### Funcionalidades de autenticação

<details>
  <summary>Registrar usuário /auth/register</summary>

  <code>POST</code> <code>/auth/register</code>

  | Headers   | Tipo       | Descrição                           |
  | :---------- | :--------- | :---------------------------------- |
  | `Content-Type` | `application/json` | **Obrigatório** -> Tipo de mídia dos dados que estão sendo enviados na requisição |

  | Parâmetros Body   | Tipo       | Descrição                           |
  | :---------- | :--------- | :---------------------------------- |
  | `username` | `string` | **Obrigatório** -> Username do usuário |
  | `password` | `string` | **Obrigatório** -> Senha do usuário |

  #### Exemplo de retorno

  <p>Status: 201 Created</p>
    {
      "id": "01957d0c-5f58-71e6-bc28-cf871b8b2bdd",
      "username": "teste",
      "password": "$2b$08$fYpjKycAj004f49Qv6jQr.y1BE1EbNk.mUEp42zBcmI1e0eTPZPWK"
    }
</details>

<details>
  <summary>Logar na rota /auth/login</summary>

  <code>POST</code> <code>/auth/login</code>

  | Headers   | Tipo       | Descrição                           |
  | :---------- | :--------- | :---------------------------------- |
  | `Content-Type` | `application/json` | **Obrigatório** -> Tipo de mídia dos dados que estão sendo enviados na requisição |

  | Parâmetros Body   | Tipo       | Descrição                           |
  | :---------- | :--------- | :---------------------------------- |
  | `username` | `string` | **Obrigatório** -> Username do usuário |
  | `password` | `string` | **Obrigatório** -> Password do usuário |

  #### Exemplo de retorno

  <p>Status: 200 OK</p>
    {
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhMzkzZTQ3NC00NTY5LTRhZWYtYWRlYy1kNjhkNWU0Yzk5MzMiLCJ1c2VybmFtZSI6InRlc3RlIiwiaWF0IjoxNzQ5MzE4MTAxLCJleHAiOjE3NDkzMjUzMDF9.Jzf6t5SSF4fNRB6ti5I2dTuDI04DZJRle7j1uKmzB70"
    }
</details>

<hr>

### Funcionalidades das tarefas em rotas autenticadas.

<details>
  <summary>Obter informações das tarefas na rota /tasks</summary>

  <code>GET</code> <code>/tasks</code>

  | Headers   | Tipo       | Descrição                           |
  | :---------- | :--------- | :---------------------------------- |
  | `Authorization` | `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | **Obrigatório** -> Seu token gerado no login |

  #### Exemplo de retorno

  <p>Status: 200 OK</p>
    [
      {
        "id": "01957d0c-5f58-71e6-bc28-cf871b8b2bdd",
        "title": "teste",
        "description": "teste",
        "status": "PENDING",
        "created_at": "2024-07-15T23:49:44.000000Z",
        "updated_at": "2024-07-15T23:49:44.000000Z"
      },
      {
        "id": "01957d0c-6021-72d3-80fb-bb6cf14f5708",
        "title": "teste2",
        "description": "teste2",
        "status": "DONE",
        "created_at": "2024-07-15T23:49:44.000000Z",
        "updated_at": "2024-07-15T23:49:44.000000Z"
      }
    ]

</details>

<details>
  <summary>Criar tarefa na rota /tasks</summary>

  <code>POST</code> <code>/tasks</code>

  | Headers   | Tipo       | Descrição                           |
  | :---------- | :--------- | :---------------------------------- |
  | `Content-Type` | `application/json` | **Obrigatório** -> Tipo de mídia dos dados que estão sendo enviados na requisição |
  | `Authorization` | `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | **Obrigatório** -> Seu token gerado no login |

  | Parâmetros Body   | Tipo       | Descrição                           |
  | :---------- | :--------- | :---------------------------------- |
  | `title` | `string` | **Obrigatório** -> Título da tarefa |
  | `description` | `string` | **Obrigatório** -> Descrição da tarefa |
  | `status` | `enum (PENDING, IN_PROGRESS, DONE)` | Status da tarefa |

  #### Exemplo de retorno

  <p>Status: 201 Created</p>
    {
      "id": "51fcc857-1953-4d46-ad17-465edc899c0c",
      "title": "teste2",
      "description": "teste2",
      "status": "PENDING",
      "createdAt": "2025-06-09T03:59:11.762Z",
      "updatedAt": "2025-06-09T03:59:11.762Z"
    }
</details>

<details>
  <summary>Alterar uma tarefa na rota /tasks/{id}</summary>

  <code>PATCH</code> <code>/tasks/{id}</code>

  | Headers   | Tipo       | Descrição                           |
  | :---------- | :--------- | :---------------------------------- |
  | `Content-Type` | `application/json` | **Obrigatório** -> Tipo de mídia dos dados que estão sendo enviados na requisição |
  | `Authorization` | `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | **Obrigatório** -> Seu token gerado no login |

  | Parâmetro via Request   | Tipo       | Descrição               |
  | :---------- | :--------- | :---------------------------------- |
  | `id` | `string` | **Obrigatório** ->  ID da tarefa |

  | Parâmetros Body   | Tipo       | Descrição                           |
  | :---------- | :--------- | :---------------------------------- |
  | `title` | `string` | Título da tarefa |
  | `description` | `string` | Descrição da tarefa |
  | `status` | `enum (PENDING, IN_PROGRESS, DONE)` | Status da tarefa |

  #### Exemplo de retorno

  <p>Status: 200 OK</p>
</details>

<details>
  <summary>Exclusão de uma tarefa na rota /tasks/{id}</summary>

  <code>DELETE</code> <code>/tasks/{id}</code>

  | Headers   | Tipo       | Descrição                           |
  | :---------- | :--------- | :---------------------------------- |
  | `Authorization` | `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | **Obrigatório** -> Seu token gerado no login |

  | Parâmetro via Request   | Tipo       | Descrição               |
  | :---------- | :--------- | :---------------------------------- |
  | `id` | `string` | **Obrigatório** ->  ID da tarefa |

  #### Exemplo de retorno

  <p>Status: 200 OK</p>
</details>

<hr>

## Autor

Caio Cesar de Deus

<hr>

## 📫 Contato
[![Linkedin](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/caio-deus)
[![Email](https://img.shields.io/badge/Microsoft_Outlook-0078D4?style=for-the-badge&logo=microsoft-outlook&logoColor=white)](mailto:caioc.deus@outlook.com)