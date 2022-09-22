import { Component, OnDestroy, OnInit } from '@angular/core';
import { fromDocument, Task, TaskDocument } from '../../models/task';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore/';
import { AngularFirestore } from '@angular/fire/compat/firestore/';
import * as firebase from "firebase/app"; 
import 'firebase/firestore';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();

  constructor(
    private firestore: AngularFirestore,
  ) { }

  tasks: Task[] = [];

  ngOnInit(): void {
    this.subscription = this.firestore.collection('tasks').valueChanges({idField: 'id'}).subscribe((tasks) => {
      this.tasks = tasks.map((value) => {
        const documentData = value as TaskDocument;
        return fromDocument(documentData)
      }).sort((a: Task, b: Task) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  addTask(task: Task): void {
    const clone = Object.assign({}, task);
    delete clone.id;
  
    this.firestore.collection('tasks').add(clone);
  }
  
  updateTask(task: Task): void {
    const clone = Object.assign({}, task);
    delete clone.id;

    this.firestore.collection('tasks').doc(task.id).update(clone);
  }


}
