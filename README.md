# 📖 O que é
### O projeto Art-Now simula um site onde o cliente requisita um pedido de arte, onde ele envia a descrição de como quer a arte, escolhe uma categoria e envia referências caso queira. Após o cliente criar um pedido, o artista poderá acessar uma sessão onde verá todos os pedidos que foram requisitados, tendo acesso as informações do cliente que o fez o pedido, podendo alterar o status do pedido, recusando ou finalizando o pedido

# 🛠️ Ferramentas

  Node.js <br>
  React.js <br>
  MySQL <br>
  JavaScript <br>
  HTML <br>
  CSS <br>

# ⚙ Como utilizar
<p>O Projeto é dividido em 2 pastas principais, uma para o Front-end e outra para o Back-end, por isso abra 2 terminais individuais</p> <br>

## Front-End

### Navegue até a pasta do Front-End
    cd react-frontend
### Instale as dependências
    npm install
### Rode o projeto
    npm start

## Back-end

### Navegue até a pasta do Back-End
    cd servidor
### Instale as dependências
    npm install
### Rode o projeto
    npm start

#### O servidor vai rodar, por exemplo, em http://localhost:5000 (depende da sua configuração). O React normalmente sobe em http://localhost:3000.

## Endpoints que serão criados

### GET
#### --- /categorias | Retorna todas as categorias
#### --- /login/user | Faz o login automatico do usuário através de um token JWT
#### --- /pedidos | Retorna todos os pedidos de um usuário através de um um token JWT
#### --- /pedidos/admGetUser/:id | Retorna as informações de um usuário para um Admin
#### --- /pedidos/admGetAll | Retorna todos os pedidos de todos os usuários para um Admin
#### --- /pedidos/admGetOne/:id | Retorna um pedido em específico para um Admin
### Post
#### --- /categorias | Cria uma nova categoria
#### --- /login/signin | Recebe o nome do usuário, análisa se o hash da senha é o mesmo do banco de dados, se o usuário existir então retorna um token JWT
#### --- /login/signup | Cria um usuário, encriptando sua senha com um hash gerado pelo Bcrypt
#### --- /login/deleteuser/:id | Deleta o usuário, junto de seus pedidos e imagens que estavam armazenados
#### --- /pedidos | Cria um pedido, e armazena as referências enviadas em uma pasta do servidor
### Patch
#### --- /categorias/:id | Atualiza uma categoria em específico
#### --- /login/edituser/:id | Atualiza os dados de um usuário em específico
#### --- /pedidos/admAlterarStatus/:id | Altera os status de um pedido em específico
### Delete
#### --- /categorias/:id | Deleta uma categoria
#### --- /pedidos/:id | Deleta um pedido e suas refências

# 🎯 Funcionalidades
☑ API RESTful <br>
☑ Cadastro de usuários <br>
☑ Validação de login <br>
☑ JWT para Autentificação e Autorização do usuário <br>
☑ Armazenamento de imagens no servidor <br>
☑ Senhas com criptografia tipo Hash <br>

[Site com o projeto](https://joelribeirod.github.io/projeto-artnow/)
