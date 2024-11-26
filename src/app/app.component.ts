import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Task {
  title: string;
  deadline: Date;
  priority: number;
  completed: boolean;
}


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  newTask: string = '';
  newDeadline: string = '';
  newPriority: number = 1;
  tasks: Task[] = [];     //Lista wszystkich zadan
  tasksToDo: Task[] = []; //Lista zadan do wykonania

  // Modal
  showModal: boolean = false;
  taskToDelete: { task: Task; index: number } | null = null;

  showSortDialog: boolean = false;


// Dodawanie nowego zadania 
addTask(): void {
  const currentDate = new Date();
  const enteredDate = new Date(this.newDeadline);

  if (!this.newTask.trim()) {
    alert('Nazwa zadania nie może być pusta.');
    return;
  }
 
  if (this.newPriority < 1) {
    alert('Priorytet musi być większy niz 0.');
    return;
  }
  if (this.newTask.trim()) {
    const newTaskObj: Task = {
      title: this.newTask.trim(),
      deadline: new Date(this.newDeadline), 
      priority: this.newPriority,
      completed: false
    };
    this.tasks.push(newTaskObj);
    this.newTask = '';
    this.newDeadline = '';
    this.newPriority = 1;
  }
}

  // Dodawanie zadania do listy do zrobiena
  addToDo(index: number): void {
    const task = this.tasks[index];
    this.tasksToDo.push(task);
    this.tasks.splice(index, 1);
  }

  // Przenoszenie z listy do zrobienia z powrotem do listy zadan
  removeFromToDo(index: number): void {
    const task = this.tasksToDo[index];
    this.tasks.push(task);
    this.tasksToDo.splice(index, 1);
  }

  openModal(task: Task, index: number): void {
    this.taskToDelete = { task, index };
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.taskToDelete = null
  }

  confirmDeleteTask(): void {
    if (this.taskToDelete) {
      this.tasks.splice(this.taskToDelete.index, 1);
      this.taskToDelete = null;
      this.showModal = false;
    }
  }

  isDeadlineExceeded(task: Task): boolean {
    return new Date() > task.deadline;
  }

  sortTasks(by: 'priority' | 'deadline', ascending: boolean): void {
    const compareFn = (a: Task, b: Task) => {
      const valueA = by === 'priority' ? a.priority : a.deadline.getTime();
      const valueB = by === 'priority' ? b.priority : b.deadline.getTime();
      return ascending ? valueA - valueB : valueB - valueA;
    };
    this.tasks.sort(compareFn);
    this.closeSortDialog();
  }

  openSortDialog(): void {
    this.showSortDialog = true;
  }

  closeSortDialog(): void {
    this.showSortDialog = false;
  }
  
}


