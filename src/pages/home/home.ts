import { Component } from '@angular/core';
import { NavController,AlertController,reorderArray,ToastController } from 'ionic-angular';
import { ArchivedTodosPage } from '../archived-todos/archived-todos';

import { TodoService } from '../../providers/todo-service/todo-service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage 
{

    public todos = [];
    public reorderIsEnabled = false;
    constructor(
        private ToastController:ToastController,
        private TodoService:TodoService,
        public navCtrl: NavController,
        private AlertController:AlertController
        ) 
    {
        this.todos =this.TodoService.getTodos();
    }
    archiveTodo(todoIndex)
    {
        this.TodoService.archivedTodo(todoIndex);
    }
    goToArchivePage()
    {
        this.navCtrl.push(ArchivedTodosPage);
    }
    toggleReorder()
    {
        this.reorderIsEnabled = !this.reorderIsEnabled;
    }
    itemReordered($event)
    {
        reorderArray(this.todos,$event);
    }
    openTodoAlert()
    {
        let addTodoAlert = this.AlertController.create({
            title:"Add a Todo",
            message:"Enter your Todo",
            inputs:[
            {
                type:"text",
                name:"addTodoInput"
            }],
            buttons:[
            {
                text:"Cancel"
            },
            {
                text:"Add Todo",
                handler:(inputData) => {
                    let todoText;
                    todoText = inputData.addTodoInput;
                    this.TodoService.addTodo(todoText);
                    
                    addTodoAlert.onDidDismiss(()=>{
                        let addTodoToast = this.ToastController.create({
                            message: "Todo Added Successfully!",
                            duration: 2000                        
                        }); 
                        addTodoToast.present();
                    });
                }
            }]
        });
        addTodoAlert.present();
    }
    editTodo(todoIndex)
    {
        let editTodoAlert = this.AlertController.create({
            title:"Edit your Todo",
            inputs:[
            {
                type:"text",
                name:"editTodoInput",
                value: this.todos[todoIndex]
            }],
            buttons:[
            {
                text:"Cancel"
            },
            {
                text:"Edit Todo",
                handler:(inputData) => {
                    let todoText;
                    todoText = inputData.editTodoInput;
                    this.TodoService.editTodo(todoText,todoIndex);

                    editTodoAlert.onDidDismiss(()=>{
                        let editTodoToast = this.ToastController.create({
                            message: "Todo edited Successfully!",
                            duration: 2000                        
                        }); 
                        editTodoToast.present();
                    });
                }
            }]
        });
        editTodoAlert.present();
    }
}
