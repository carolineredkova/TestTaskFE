import { Component, OnInit } from '@angular/core';
import { Task } from '../../classes/task';
import { TaskService } from '../../services/task.service';

@Component({
	selector: 'app-tasks',
	templateUrl: './tasks.component.html',
	styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
	tasks: Task[]

	constructor(private taskService: TaskService) { }

	ngOnInit() {
		this.getTasks();
	}

	getTasks() {
		this.taskService.getTasks().subscribe(tasks => {
			this.tasks = tasks;
		});
	}

	addTask(description: string) {
		this.taskService.addTask(description).subscribe((newTask: Task) => {
			this.tasks = [...this.tasks, newTask];
		});
	}

	removeTask(taskIdToDelete: number) {
		this.taskService.removeTask(taskIdToDelete).subscribe(() => {
			this.tasks = this.tasks.filter(task => task.id !== taskIdToDelete);
		});
	}

	editTask(taskToUpdate: any) {
		this.taskService.editTask(taskToUpdate.taskId, taskToUpdate.newDescription).subscribe((updatedTask: Task) => {
			this.tasks = this.tasks.map(task => {
				if (task.id === updatedTask.id) task.description = updatedTask.description;
				return task;
			});
		});
	}

	editModeActive(activeTaskId: number) {
		this.tasks = this.tasks.map(task => {
			task.isActive = task.id === activeTaskId;
			return task;
		});
	}

}
