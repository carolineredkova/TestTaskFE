import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-input',
  templateUrl: './task-input.component.html',
  styleUrls: ['./task-input.component.css']
})
export class TaskInputComponent implements OnInit {
  public taskText: string;
  @Output() taskAdded = new EventEmitter<string>();

  constructor(private taskService: TaskService) {
    this.taskText = '';
  }

  ngOnInit() {
  }

  addTask(): void {
    this.taskAdded.emit(this.taskText);
    this.taskText = '';
  }

}
