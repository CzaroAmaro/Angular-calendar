import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  newTask: string = '';
  tasks: string[] = [];     //Lista wszystkich zadan
  tasksToDo: string[] = []; //Lista zadan do wykonania

  // Modal
  showModal: boolean = false;
  taskToDelete: { task: string; index: number } | null = null;


// Dodawanie nowego zadania
  addTask(): void {
    if (this.newTask.trim()) {
      this.tasks.push(this.newTask.trim());
      this.newTask = '';
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

  openModal(task: string, index: number): void {
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
}


