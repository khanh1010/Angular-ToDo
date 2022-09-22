import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '../../models/task';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore/';
import { AngularFirestore } from '@angular/fire/compat/firestore/';
import * as firebase from "firebase/app"; 
import 'firebase/firestore';

@Component({
  selector: 'app-task-list-item',
  templateUrl: './task-list-item.component.html',
  styleUrls: ['./task-list-item.component.scss']
})
export class TaskListItemComponent implements OnInit {

  constructor(
    private firestore: AngularFirestore,
  ) { }


  @Input() task: Task= {title: "", done: false, deadline: new Date(), createdAt: new Date()};
  @Output() updateTask = new EventEmitter<Task>();

  ngOnInit(): void {
  }

  isOverdue(task: Task) {
    return !task.done && task.deadline && task.deadline.getTime() < (new Date()).setHours(0, 0, 0, 0);
  }

  onToggleDone(task: Task): void {
    this.updateTask.emit(task);
  }

  delete(task: Task): void {
    const clone = Object.assign({}, task);
    delete clone.id;
  
    this.firestore.collection('tasks').doc(task.id).delete();
  }
}

