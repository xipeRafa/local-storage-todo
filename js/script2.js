const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('.todo-input');
const todoItemsList = document.querySelector('.todo-items');

let todos = [];
let edit = false
let editID 

todoForm.addEventListener('submit', function(event) {
  event.preventDefault();
  addTodo(todoInput.value);
});

function addTodo(item) {
  console.log(todos)

  if(edit){
    todos.forEach(el => el.id == editID ? el.name = todoInput.value : el) 
    addToLocalStorage(todos) 
    edit = false
  }else{

    if (item !== '') {
      const todo = {
        id: Date.now(),
        name: item,
        completed: false
      };

      todos.push(todo);
      addToLocalStorage(todos)
    }

  }
  todoInput.value = '';
}

function renderTodos(todos) {

  todoItemsList.innerHTML = '';

  todos.forEach(function(item) {
    const checked = item.completed ? 'checked': null;
    const li = document.createElement('li');
    li.setAttribute('class', 'item');
    li.setAttribute('id', item.id);
 
    item.completed ? li.classList.add('checked') : null
    

    li.innerHTML = `
      <input type="checkbox" class="checkbox" ${checked}>

      ${item.name}

      <button class="delete-button">X</button>
      <button class="edit-button">Edit</button>
    `;

    todoItemsList.append(li);
  });

}

function addToLocalStorage(todos) {
  localStorage.setItem('todos', JSON.stringify(todos));
  renderTodos(todos);
}

function getFromLocalStorage() {
  const reference = localStorage.getItem('todos');
  if (reference) {
    todos = JSON.parse(reference);
    renderTodos(todos);
  }
}

function toggle(id) {
  todos.forEach(item => item.id == id ? item.completed = !item.completed : item)
  addToLocalStorage(todos)
  console.log(todos)
}

function deleteTodo(id) {
  todos = todos.filter(item => item.id != id)
  addToLocalStorage(todos);
}

function editTodo(id){
  const editName = todos.find(el => el.id == id ).name
  todoInput.value = editName

  edit = true

  sendEditId(id)
}

function sendEditId(id){
  editID = id
}

getFromLocalStorage();

todoItemsList.addEventListener('click', function(event) {
  if (event.target.type === 'checkbox') {
     toggle(event.target.parentElement.getAttribute('id'));
  }
  if (event.target.classList.contains('delete-button')) {
     deleteTodo(event.target.parentElement.getAttribute('id'));
  }

  if (event.target.classList.contains('edit-button')) {
    editTodo(event.target.parentElement.getAttribute('id'));
 }
});