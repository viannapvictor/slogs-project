# Slogs Project

O projeto Slogs é um serviço de registros de segurança no qual os usuários podem mapear possíveis problemas 
que podem ser de diferentes níveis de gravidade, nosso serviço consiste em oferecer uma poderosa ferramenta
para as organizações poderem evitar acidentes de trabalho futuros.

![Página inicial do site](images/home-page.jpg?raw=true)

## Branches de avaliação

- TP4/TP5: https://github.com/23E123E2DFEFLN2/slogs-project/tree/tp5

## Como usar (Para desenvolvimento ou avaliação)

### Requisitos
- .NET 7.0 (API)
- Node.js (Servidor front-end)
- Docker instalado (MSSQL)

### Para rodar a API

Antes de executar a API, primeiro é necessário criar o container do banco de dados MSSQL, para isso
utilize o comando em um terminal Windows/Linux: 

```console
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=minhaSenh@123" -p 1433:1433 -d mcr.microsoft.com/mssql/server:2022-latest
```

E pronto, o container ficará salvo no Docker e você poderá reutiliza-lo caso necessário.

Quando o container do MSSQL estiver on-line, você poderá seguir esses passos:

- Do diretório raiz do projeto, vá para a pasta localizada em: src\api\SlogsProject.API\
- Ao chegar na pasta, execute o seguinte comando: 

```console
dotnet run
```

### Para rodar a aplicação Web

- Do diretório raiz do projeto, vá para a pasta localizada em: src\web-app\
- Ao chegar na pasta, execute o seguinte comando para instalar os pacotes necessários:

```console
npm install
```

- Depois utilize o comando a seguir para lançar a aplicação Web:

```console
npm run dev
```

### Para rodar a aplicação Mobile

- Do diretório raiz do projeto, vá para a pasta localizada em: src\mobile-app\
- Ao chegar na pasta, execute o seguinte comando para instalar os pacotes necessários:

```console
npm install
```

- Depois utilize o comando a seguir para lançar a aplicação:

```console
npm run start
```

### Para rodar os testes cypress da aplicação Web

Nota: A API e a aplicação Web devem estar em execução

- Ao chegar na pasta do projeto web-app, execute o seguinte comando para fazer os testes:

```console
npx cypress run
```

### Para rodar os testes do React-Testing-Library

- Ao chegar na pasta do projeto web-app, execute o seguinte comando para fazer os testes:

```console
npm run test
```

## Documentação API

### Registrar Organização

Registra uma organização ao banco de dados.

```http
POST /Auth/RegisterOrganization
```

#### Formulário

```typescript
{
    "email": string,
    "password": string,
    "name": string,
    "phone": string
}
```

#### Resultado

```typescript
{
    "error": string | undefined
}
```

#### Possíveis Status Code

| Status Code | Descrição     |
|-------------|---------------|
| 200         | `OK`          |
| 400         | `BAD REQUEST` |

#### Possíveis erros

| ErrorType        | Descrição                                         |
|------------------|---------------------------------------------------|
| InvalidEmail     | O valor para o e-mail apresentado não é um e-mail |
| DuplicateEmail   | O e-mail apresentado já está registrado           |
| PasswordTooShort | A senha apresentada possui menos de 6 caracteres  |

### Registrar Usuário

Registra um usuário a uma organização no banco de dados.

```http
POST /Auth/RegisterUser
```

#### Formulário

```typescript
{
    "email": string,
    "password": string,
    "name": string,
    "organizationId": string
}
```

#### Resultado

```typescript
{
    "error": string | undefined
}
```

#### Possíveis Status Code

| Status Code | Descrição     |
|-------------|---------------|
| 200         | `OK`          |
| 400         | `BAD REQUEST` |

#### Possíveis erros

| ErrorType        | Descrição                                         |
|------------------|---------------------------------------------------|
| InvalidEmail     | O valor para o e-mail apresentado não é um e-mail |
| DuplicateEmail   | O e-mail apresentado já está registrado           |
| PasswordTooShort | A senha apresentada possui menos de 6 caracteres  |

### Login

Faz o login de uma organização/usuário. Necessita que o credentials seja incluído na requisição para
o registro dos cookies.

```http
POST /Auth/Login
```

#### Formulário

```typescript
{
    "email": string,
    "password": string,
    "remember": bool
}
```

#### Resultado

```typescript
{
    "error": string | undefined
}
```

#### Possíveis Status Code

| Status Code | Descrição      |
|-------------|----------------|
| 200         | `OK`           |
| 400         | `BAD REQUEST`  |
| 401         | `UNAUTHORIZED` |

#### Possíveis erros

| ErrorType                | Descrição                                         |
|--------------------------|---------------------------------------------------|
| IncorrectEmailOrPassword | E-mail não registrado ou senha incorreta          |

### Logout

Faz o logout seguro do cliente. Necessita que o credentials seja incluído na requisição.

```http
POST /Auth/Logout
```

#### Possíveis Status Code

| Status Code | Descrição      |
|-------------|----------------|
| 200         | `OK`           |
| 401         | `UNAUTHORIZED` |

### Atualizar Token

Cria novos access token e refresh token para o cliente. Necessita que o credentials seja incluído na requisição.

```http
POST /Auth/RefreshToken
```

#### Possíveis Status Code

| Status Code | Descrição      |
|-------------|----------------|
| 200         | `OK`           |
| 401         | `UNAUTHORIZED` |

### Deletar Conta

Deleta a conta do usuário atual do banco de dados. Necessita que o credentials seja incluído na requisição.

```http
DELETE /Auth/DeleteAccount
```

#### Possíveis Status Code

| Status Code | Descrição      |
|-------------|----------------|
| 200         | `OK`           |
| 401         | `UNAUTHORIZED` |

### Pegar Usuário Atual

Pega informações simples da conta atual. Necessita que o credentials seja incluído na requisição.

```http
GET /Auth/GetCurrentAccount
```

#### Resultado

```typescript
{
    "result": {
        "id": string,
        "email": string,
        "name": string,
        "role": OrganizationRole
    } | undefined
}
```

#### Possíveis Status Code

| Status Code | Descrição      |
|-------------|----------------|
| 200         | `OK`           |
| 401         | `UNAUTHORIZED` |

### Adicionar Log de Incidente

Adiciona um log de incidente para a organização no banco de dados. Necessita que o credentials seja incluído na requisição.

```http
POST /Organization/AddIncidentLog
```

#### Formulário

Nota: O envio precisa ser feito utilizando o `FormData`

```typescript
{
    "title": string,
    "description": string,
    "urgency": string,
    "images": Blob[]
}
```

#### Resultado

```typescript
{
    "result": {
        "title": string,
        "description": string,
        "urgency": string,
        "images": []
    } | undefined,
    "error": string | undefined
}
```

#### Possíveis Status Code

| Status Code | Descrição      |
|-------------|----------------|
| 201         | `CREATED`      |
| 400         | `BAD REQUEST`  |
| 401         | `UNAUTHORIZED` |