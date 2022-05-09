# todo-server
This todo-server is an API related to this project : [todo-project](https://github.com/MoniSwon/todo-project)

To run this project, you can use :
> node app

The server will be run on [http://localhost:8080](http://localhost:8080)

# Set up of a table in a mySQL database.
Name of the table : **todo** (utf8mb3_general_ci)

Properties :
* id : int(11) auto-increment
* title : varchar(250)
* due_date : date
* creation_date : datetime
* status : varchar(250)
* label : varchar(250)
* user : varchar(250)

# URL
### **GET** : [http://localhost:8080/api/todos](http://localhost:8080/api/todos)

*get all the todos in your table*

### **GET** : [http://localhost:8080/api/todo/:id](http://localhost:8080/api/todos/1)

*get the todo with the id you put*

### **POST** : [http://localhost:8080/api/createTodo](http://localhost:8080/api/createTodo)

*create a new todo*

  * **Header** :
>Content-Type : application/json
  * **Payload** : 
```
{
    "title":"put a title here",
    "description":"this is a really descriptive description",
    "due_date":"2022-03-15",
    "status":"completed",
    "label":"No",
    "user":"Monica"
}
```

### **PATCH** : [http://localhost:8080/api/updateTodo](http://localhost:8080/api/updateTodo)

*update a todo*

* **Example** :
http://localhost:8080/api/updateTodo?id=1&title=title&user=you&description=reallyDescriptiveDescription&due_date=2022-06-01&status=yes&label=yes

### **DELETE** : [http://localhost:8080/api/deleteTodo?id={id}](http://localhost:8080/api/deleteTodo?id=1)

*delete a todo with the id you give*


