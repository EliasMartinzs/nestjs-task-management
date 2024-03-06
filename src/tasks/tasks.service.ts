import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { randomUUID } from 'crypto';
import { CreateTasksDto } from './models/create-tasks.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  createTasks(createTaskDto: CreateTasksDto): Task {
    const { description, title } = createTaskDto;

    const task: Task = {
      description,
      title,
      status: TaskStatus.OPEN,
      id: randomUUID(),
    };

    this.tasks.push(task);

    return task;
  }

  deleteTask(id: string): void {
    this.tasks = this.tasks.filter((taks) => taks.id !== id);
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
