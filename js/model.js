export default class Model {
    constructor(){
        this.controller = null;
        this.todos = JSON.parse(localStorage.getItem('todos'));
        if(!this.todos || this.todos.length < 1){
            this.todos = [];
            this.currentId = 1;
        }else{
            this.currentId = this.todos[this.todos.length - 1].id + 1;
        }
    }

    setController(controller){
        this.controller = controller;
    }

    getTodos(){
        return this.todos.map((todo)=> ({...todo}));
    }

    findTodo(id){
        console.log("esto es lo que regresa find todo");
        console.log(this.todos.findIndex( (todo) => todo.id === id  ));
        console.log("-------------------")
        return this.todos.findIndex( (todo) => todo.id === id  );
    }

    saveTodo(title, description){
        const todo = {
            id: this.currentId++,
            title,
            description,
            completed: false,
        };

        this.todos.push(todo);
        this.save();
        return { ...todo }
    }

    removeTodo(id){
        const index = this.findTodo(id);
        this.todos.splice(index, 1);
        this.save();
    }

    saveEdit(id, title, description, completed){

        console.log("en model se recibieron este id " + id + " este titulo: " + title+ " esta desc: " + description + " y esta completo?" + completed);
        
        const todoEdit = {
            id,
            title,
            description,
            completed
        };

        console.log(todoEdit);

        const index = this.findTodo(id);
        this.todos[index] = todoEdit;
        this.save();
        this.controller.clearForm();
        this.controller.updateRow(todoEdit);
    }

    toogleCompleted(id){
        const index = this.findTodo(id);
        const todo = this.todos[index];
        todo.completed = !todo.completed;
        this.save();
    }


    save(){
        localStorage.setItem('todos', JSON.stringify(this.todos))
    }


}