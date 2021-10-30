const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('.todo-input');
const todoItemsList = document.querySelector('.todo-items');
const addButton = document.querySelector('.add-button');
const completed = document.querySelector('#completed')


let todos = [];
let edit = false
let editID
function completedTrue(){
  const c = todos.filter(el => el.completed === true).length
  completed.textContent = c + ` Completed of ${todos.length}`
} 


todoForm.addEventListener('submit', function(event) {
  event.preventDefault();
  addTodo(todoInput.value);
});

function addTodo(item) {
  console.log(todos)
  if(edit){
    todos.forEach(el => el.id == editID ? el.name = todoInput.value : el) 
    addToLocalStorage(todos) 
    addButton.textContent = 'Edited successfully'
    setTimeout(() => {
      addButton.textContent = 'Add Item'
    }, 3000);
    edit = false
  }else{

    if (item !== '') {
      const todo = { id: Date.now(), name: item, completed: false };
      todos.push(todo);
      addToLocalStorage(todos)
      addButton.textContent = 'Added Great!!'
      setTimeout(() => {
        addButton.textContent = 'Add Item'
      }, 3000);
    }

  }
  todoInput.value = '';
  completedTrue()
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
      
      <label id='${item.id}'>
        <input for='${item.id}' type="checkbox" class="checkbox" ${checked}>
        ${item.name}
      </label>

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
  completedTrue()
}

function toggle(id) {
  todos.forEach(item => item.id == id ? item.completed = !item.completed : item)
  addToLocalStorage(todos)
  console.log(todos)
  completedTrue()
}

function deleteTodo(id) {
  todos = todos.filter(item => item.id != id)
  addToLocalStorage(todos);
  completedTrue()
}

function editTodo(id){
  addButton.textContent = 'Save Edit'
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