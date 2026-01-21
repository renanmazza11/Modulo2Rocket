const express = require('express');
const cors = require('cors');

const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
  
  const {username} = request.headers;

  const usernameExist = users.find(user => user.username === username);

  if(!usernameExist){
    return response.status(404).json({error: "Username not Exist!"});
  }

  request.user = usernameExist;

  return next();

}

app.post('/users', (request, response) => {

    const {name, username}= request.body;

    const usernameExist = users.some(users => users.username === username);

    if(usernameExist){
      return response.status(400).json({error: "Username Already exist!"})
    }

    const newUser = {

      id: uuidv4(),
      name,
      username,
      todos: []
    }

    users.push(newUser)

    return response.status(201).json({message: "Usuário criado com sucesso!", user: newUser})


});

app.get('/todos', checksExistsUserAccount, (request, response) => {

  const {user} = request;

  return response.status(200).json(user.todos)
  
});






app.post('/todos', checksExistsUserAccount, (request, response) => {

  const {title, deadline} = request.body

  const {user} = request;

  const newTodos = {

    id: uuidv4(),
    title,
    done: "false",
    deadline: new Date(deadline),
    created_at: new Date()

  }

  user.todos.push(newTodos);

  return response.status(200).json(user);


});






app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

module.exports = app;