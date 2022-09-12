import FormTodo from "./components/form-todo.js";
import searchBar from "./components/searchBar.js";
import navbar from "./components/navbar.js";

export default class Controller {
    constructor(){
        this.model = null;
        this.table = document.getElementById('table');
        this.formTodo = new FormTodo();
        this.formTodo.onClick( (title, description) => this.addTodo(title,description) );

        this.searchBar = new searchBar();
        this.searchBar.onClick((search) => this.search(search));

        this.navbar = new navbar();
        this.navbar.onClick(() => this.updateRender());
    }

    setModel(model){
        this.model = model;
    }

    render(){
        const todos = this.model.getTodos();
        todos.forEach(todo => this.createRow(todo));
    }

    toogleCompleted(id){
        this.model.toogleCompleted(id);
    }

    addTodo(title, description){
        const todo = this.model.saveTodo(title, description);
        this.createRow(todo);
        this.clearForm();
    }

    removeTodo(id){
        this.model.removeTodo(id);
        document.getElementById(id).remove();
    }

    editTodo(id){
        const todosList = this.model.getTodos();
        console.log("el id que se recibió fue: " + id)
        console.log("al todos se le esta enviando el index: " + this.model.findTodo(id) );
        const todoEdit = todosList[this.model.findTodo(id)];
        this.formTodo.title.value = todoEdit.title;
        console.log("este es el titulo: " + todoEdit.title);
        console.log(todoEdit);
        this.formTodo.description.value = todoEdit.description;
        this.formTodo.btn.innerHTML = 'Save';
        this.formTodo.btn.onclick = () => this.model.saveEdit(todoEdit.id, this.formTodo.title.value, this.formTodo.description.value, todoEdit.completed);
    }

    search(search){
        const todos = this.model.getTodos();
        const todosSearch = todos.filter(todo => todo.title.toLowerCase().includes(search.toLowerCase()) || todo.description.toLowerCase().includes(search.toLowerCase()));
        this.table.innerHTML = '';
        todosSearch.forEach(todo => this.createRow(todo));
    }

    clearForm(){
        this.formTodo.title.value = '';
        this.formTodo.description.value = '';
        console.log("Se borro el formulario");
    }

    updateRender(){
        this.table.innerHTML = '';
        this.render();
    }

    updateRow(todo){
        const row = document.getElementById(todo.id);
        row.innerHTML = `
            <td>${todo.title}</td>
            <td>${todo.description}</td>
            <td class="text-center"> </td>
            <td class="text-right"> </td>
        `;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.onclick = () => this.toogleCompleted(todo.id);
        row.children[2].appendChild(checkbox);

        const removeBtn = document.createElement('button');
        removeBtn.classList.add('btn', 'btn-danger', 'mb-1', 'ml-1');
        removeBtn.innerHTML = '<i class="fa fa-trash"></i>';
        removeBtn.onclick = () => this.removeTodo(todo.id);
        row.children[3].appendChild(removeBtn);

        const editBtn = document.createElement('button');
        editBtn.classList.add('btn', 'btn-warning', 'mb-1', 'ml-1');
        editBtn.innerHTML = '<i class="fa fa-edit"></i>';
        editBtn.onclick = () => this.editTodo(todo.id);
        row.children[3].appendChild(editBtn);

        this.formTodo.btn.innerHTML = 'Add';
    }
    

    createRow(todo){
        const row = table.insertRow();
        row.setAttribute('id', todo.id);
        row.innerHTML = `
            <td> ${todo.title} </td>
            <td> ${todo.description} </td>
            <td class="text-center"> </td>
            <td class="text-right"> </td>
        `;

        

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.onclick = () => this.toogleCompleted(todo.id);
        row.children[2].appendChild(checkbox);

        const removeBtn = document.createElement('button');
        removeBtn.classList.add('btn', 'btn-danger', 'mb-1', 'ml-1');
        removeBtn.innerHTML = '<i class="fa fa-trash"></i>';
        removeBtn.onclick = () => this.removeTodo(todo.id);
        row.children[3].appendChild(removeBtn);

        const editBtn = document.createElement('button');
        editBtn.classList.add('btn', 'btn-warning', 'mb-1', 'ml-1');
        editBtn.innerHTML = '<i class="fa fa-edit"></i>';
        editBtn.onclick = () => this.editTodo(todo.id);
        row.children[3].appendChild(editBtn);
        
    }
}