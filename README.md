# Rest API com autenticação
Esta API utilizada para tal e tal...
## Endpoints

## Rota de Autenticação
### POST /authentication
Rota responsável por fazer o processo de login. Só ela retorna o token necessário para acesso das demais rotas.
#### Parâmetros
email: E-mail do usuário cadastrado no sistema.

password: Senha do usuário cadastrado no sistema com aquele determinado e-mail.

Exemplo:
```
{
    "email":"fulano@email.com",
    "password":"senha"
}
```
#### Respostas
##### OK 200
Retorna o token JWT que permite o acesso aos endpoints protegidos da API por 48 horas.

Exemplo de resposta:
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ2aWN0b3JkZXZAZ3VpYS5jb20iLCJpYXQiOjE2MjgwOTgxMTYsImV4cCI6MTYyODI3MDkxNn0.vGmwduBlmMHuWmh33FoR631ahiO2dphKLExF9GP2zDE"
}
```
##### Unauthorized 401
Significa que ocorreu alguma falha durante o processo de autenticação da requisição. Motivos: Senha incorreta ou e-mail não cadastrado no banco de dados.

Exemplo de resposta:
```
{
    "err": "Senha inválida"
}
```
##### Not Found 404
Significa que houve algum erro durante o processo de busca no banco de dados ou no processo de geração do token.

Exemplo de resposta:
```
{
    "err": "O processo de busca no banco de dados falhou."
}

```

## Rotas Autenticadas
### Authorization
headers.Authorization: Token para validação das requisições.

Exemplo:
```
headers:{
	Authorization:`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ2aWN0b3JkZXZAZ3VpYS5jb20iLCJpYXQiOjE2MjgwOTgxMTYsImV4cCI6MTYyODI3MDkxNn0.vGmwduBlmMHuWmh33FoR631ahiO2dphKLExF9GP2zDE`
}
```


### GET /games
Rota responsável por retornar a listagem de todos os jogos cadastrados no banco de dados.

#### Parâmetros
Nenhum

#### Respostas
##### OK 200
Retorna a listagem de todos os jogos.

Exemplo de resposta:
```
[
    {
        "id": 1,
        "name": "God of War",
        "price": "250.00",
        "createdAt": "2021-07-30T20:58:14.000Z",
        "updatedAt": "2021-08-03T15:44:57.000Z"
    },
    {
        "id": 2,
        "name": "Fifa 22",
        "price": "300.00",
        "createdAt": "2021-08-02T14:08:18.000Z",
        "updatedAt": "2021-08-03T15:45:19.000Z"
    },
    {
        "id": 3,
        "name": "Pes 21",
        "price": "200.00",
        "createdAt": "2021-08-02T14:09:40.000Z",
        "updatedAt": "2021-08-03T15:45:28.000Z"
    }
]
```
##### Unauthorized 401
Significa que aconteceu alguma falha durante o processo de autenticação da requisição. Motivos: Token inválido, Token expirado.

Exemplo de resposta:
```
{
    "err": "token invalido"
}
```
##### Not found 404
Significa que aconteceu algum erro durante o processo de busca no banco de dados

Exemplo de resposta:
```
{
    "err": "O processo de busca no banco de dados falhou."
}
```







### GET /game/:id
Rota responsável por retornar um jogo de acordo com o id informado.


#### Parâmetros
id: Id do jogo desejado.

#### Respostas
##### OK 200
Retorna o game.

Exemplo de resposta:
```
{
    "id": 1,
    "name": "God of War",
    "price": "250.00",
    "createdAt": "2021-07-30T20:58:14.000Z",
    "updatedAt": "2021-08-03T15:44:57.000Z"
}
```
##### Bad Request 400
Ocorre quando o parâmetro "id" é inválido

Exemplo de resposta:
```
{
    "err": "Id inválido"
}
```
##### Unauthorized 401
Significa que aconteceu alguma falha durante o processo de autenticação da requisição. Motivos: Token inválido, Token expirado.

Exemplo de resposta:
```
{
    "err": "token invalido"
}
```
##### Not found 404
Significa que o jogo não foi encontrado ou que o processo de busca no banco de dados teve alguma falha.

Exemplo de resposta:
```
{
    "err": "O processo de busca no banco de dados falhou."
}
```





### DELETE /game/:id
Rota responsável por deletar um jogo de acordo com o id informado.


#### Parâmetros
id: Id do jogo desejado.

#### Respostas
##### OK 200
Significa que o jogo foi deletado.

Exemplo de resposta:
```
{
    "res": "OK!"
}
```
##### Bad Request 400
Ocorre quando o parâmetro id é inválido

Exemplo de resposta:
```
{
    "err": "Id inválido"
}
```
##### Unauthorized 401
Significa que aconteceu alguma falha durante o processo de autenticação da requisição. Motivos: Token inválido, Token expirado.

Exemplo de resposta:
```
{
    "err": "token invalido"
}
```
##### Not found 404
Significa que o jogo não foi encontrado ou que o processo de busca no banco de dados teve alguma falha.

Exemplo de resposta:
```
{
    "err": "O processo de busca no banco de dados falhou."
}
```





### POST /game
Rota responsável por criar um novo jogo.

#### Parâmetros
name: Nome do jogo.

price: Preço do jogo.

Exemplo:
```
{
    "name":"Fifa 22",
    "price":"300.00"
}
```

#### Respostas
##### Created 201
Jogo criado com sucesso.

Exemplo de resposta:
```
{
    "res": "OK!"
}
```
##### Bad Request 400
Ocorre quando os parâmetros não estão preenchidos ou são inválidos.

Exemplo de resposta:
```
{
    "err": "Parâmetros não preenchidos corretamente."
}
```
##### Unauthorized 401
Significa que aconteceu alguma falha durante o processo de autenticação da requisição. Motivos: Token inválido, Token expirado.

Exemplo de resposta:
```
{
    "err": "token invalido"
}
```
##### Not found 404
Significa que houve alguma falha no processo de busca no banco de dados.

Exemplo de resposta:
```
{
    "err": "O processo de busca no banco de dados falhou."
}
```







### PUT /game/:id
Rota responsável por atualizar os dados de um jogo já cadastrado.


#### Parâmetros
id: Id do jogo desejado.

name: Nome do jogo.

price: Preço do jogo.

Exemplo:
```
{
    "name":"Fifa 22",
    "price":"300.00"
}
``` 

#### Respostas
##### OK 200
Jogo atualizado com sucesso.

Exemplo de resposta:
```
{
    "res": "OK!"
}
```
##### Bad Request 400
Ocorre quando o parâmetro "id" é inválido ou quando os parâmetros "name" e "price" são inválidos.

Exemplo de resposta:
```
{
    "err": "Id inválido"
}
```
##### Unauthorized 401
Significa que aconteceu alguma falha durante o processo de autenticação da requisição. Motivos: Token inválido, Token expirado.

Exemplo de resposta:
```
{
    "err": "token invalido"
}
```
##### Not found 404
Significa que o jogo não foi encontrado ou que o processo de busca no banco de dados teve alguma falha.

Exemplo de resposta:
```
{
    "err": "Game não encontrado"
}
```

