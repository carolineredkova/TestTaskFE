import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Task } from '../../classes/task';
@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {
  @Input() task: Task;
  @Output() editModeActive = new EventEmitter<number>();
  @Output() removeTask = new EventEmitter<number>();
  @Output() editTask = new EventEmitter<object>();

  constructor() {
  }

  ngOnInit() {
  }

  activateInputField(input): void {
    this.task.isActive = true;
    setTimeout(() => document.getElementById(this.task.id.toString()).focus(), 0);
    this.editModeActive.emit(this.task.id);
  }

  deleteTask(): void {
    this.removeTask.emit(this.task.id);
  }

  saveChanges(newDescription): void {
    this.editTask.emit({ taskId: this.task.id, newDescription });
    this.task.isActive = false;
  }

  revertChanges(): void {
    this.task.isActive = false;
  }
}
