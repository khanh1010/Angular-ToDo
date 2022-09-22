import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import Timestamp = firebase.firestore.Timestamp;

export interface Task {
  id?: string;
  title: string;
  done: boolean;
  deadline: Date | null;
  createdAt: Date;
}

export interface TaskDocument {
  id: string;
  title: string;
  done: boolean;
  deadline?: Timestamp;
  createdAt: Timestamp;
}

export function fromDocument(doc: TaskDocument): Task {
  return {
    id: doc.id,
    title: doc.title,
    done: doc.done,
    deadline: doc.deadline ? doc.deadline.toDate() : null,
    createdAt: doc.createdAt.toDate(),
  };
}