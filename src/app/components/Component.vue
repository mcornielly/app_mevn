<template>
    <div>
         <nav class="navbar navbar-light bg-light">
             <a href="/" class="navbar-brand">NEW Stack</a>
         </nav>
        <div class="container">
            <div class="row pt-4">
                <div class="col-md-5">
                    <div class="card">
                        <div class="card-header">
                            <h4>Nueva Tarea</h4>
                        </div>
                        <div class="card-body">
                            <form @submit.prevent="sendTask">
                                <div class="form-group">
                                    <input type="text" class="form-control" placeholder="Ingresa una Nueva Tarea" v-model="task.title">
                                </div>
                                <div class="form-group">
                                    <textarea cols="30" rows="10" class="form-control" placeholder="Inserte una Descripción" v-model="task.description"></textarea>
                                </div>
                                <template v-if="edit===false">
                                    <button class="btn btn-primary btn-block">Guardar</button>    
                                </template>
                                <template v-else>
                                    <button class="btn btn-primary btn-block">Actualizar</button>    
                                </template>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="col-md-7">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>Task</th>
                                <th>Description</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="task in tasks" :key="task.id">
                                <td>{{task.title}}</td>
                                <td>{{task.description}}</td>
                                <td>
                                    <button class="btn btn-danger btn-sm" @click="deleteTask(task._id)">
                                        Delete
                                    </button>
                                    <button class="btn btn-info btn-sm" @click="editTask(task._id)">
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

// class Task {
//     constructor(title, description){
//         this.title = title;
//         this.description = description;
//     }
// }


export default {
    data() {
        return {
            task: {
                id: '', 
                title: '',
                description: ''
            },
            tasks: [],
            edit: false
            // task: new Task()
        }
    },
    created() {
        this.getTask();
    },
    methods: {
        getTask() {
            fetch('/api/tasks')
                .then(res => res.json())
                .then(data => {
                    this.tasks = data
                    console.log(this.tasks)
                });
        },
        sendTask() {
            if(this.edit === false){
                this.addTask();
            }else{
                this.updateTask();
            }
        },
        addTask() {
            fetch('/api/tasks', {
                method: 'POST',
                body: JSON.stringify(this.task),
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                this.getTask();
            });
            console.log(this.task);
            // this.task = new Task();
            this.task.title = '';
            this.task.description = '';
        },
        updateTask() {
            console.log(this.id)
            fetch(`/api/tasks/${this.id}`, {
                method: 'PUT',
                body: JSON.stringify(this.task),
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                this.getTask();
                this.edit = false;
            });
            console.log(this.task);
            // this.task = new Task();
            this.task.title = '';
            this.task.description = '';
        },
        deleteTask(id) {
            fetch(`/api/tasks/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                this.getTask();
            });
            console.log(id)
        },
        editTask(id) {
            fetch(`/api/tasks/${id}`)
                .then(res => res.json())
                .then(data => {
                    this.id = data._id;
                    this.task.title = data.title;
                    this.task.description = data.description;
                    this.edit = true;
                });
        }
    }
}
</script>