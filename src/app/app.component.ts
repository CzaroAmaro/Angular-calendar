import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Task {
  title: string;
  deadline: Date;
  priority: number;
  completed: boolean;
  status: 'to-do' | 'in-progress' | 'done';
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
  tasks: Task[] = []; // Lista wszystkich zadań
  tasksToDo: Task[] = []; // Lista zadań do wykonania

  // Modal
  showModal: boolean = false;
  taskToDelete: { task: Task; index: number } | null = null;

  showSortDialog: boolean = false;

  // Dodawanie nowego zadania
  addTask(): void {
    if (!this.newTask.trim()) {
      alert('Nazwa zadania nie może być pusta.');
      return;
    }

    if (this.newPriority < 1) {
      alert('Priorytet musi być większy niż 0.');
      return;
    }

    if (!this.newDeadline.trim()) {
      alert('Musisz podać datę.');
      return;
    }

    const newTaskObj: Task = {
      title: this.newTask.trim(),
      deadline: new Date(this.newDeadline),
      priority: this.newPriority,
      completed: false,
      status: 'to-do', // Ustawienie początkowego statusu
    };

    this.tasks.push(newTaskObj);

    // Resetowanie formularza
    this.newTask = '';
    this.newDeadline = '';
    this.newPriority = 1;
  }

  // Dodawanie zadania do listy do wykonania
  addToDo(index: number): void {
    const task = this.tasks[index];
    this.tasksToDo.push(task);
    this.tasks.splice(index, 1);
  }

  // Przenoszenie z powrotem z listy do wykonania
  removeFromToDo(index: number): void {
    const task = this.tasksToDo[index];
    this.tasks.push(task);
    this.tasksToDo.splice(index, 1);
  }

  // Modal zarządzania
  openModal(task: Task, index: number): void {
    this.taskToDelete = { task, index };
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.taskToDelete = null;
  }

  confirmDeleteTask(): void {
    if (this.taskToDelete) {
      const { index } = this.taskToDelete;
      this.tasks.splice(index, 1);
      this.taskToDelete = null;
      this.showModal = false;
    }
  }

  // Sprawdzanie czy termin zadania został przekroczony
  isDeadlineExceeded(task: Task): boolean {
    return new Date() > task.deadline;
  }

  // Sortowanie zadań
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

  // Aktualizacja statusu zadania
  updateTaskStatus(task: Task, newStatus: 'to-do' | 'in-progress' | 'done'): void {
    task.status = newStatus;
  }
}

