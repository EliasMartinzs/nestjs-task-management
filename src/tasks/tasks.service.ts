import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { randomUUID } from 'crypto';
import { CreateTasksDto } from './models/create-tasks.dto';
import { GetTasksFilterDto } from './models/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    const found = this.tasks.find((task) => task.id === id);

    if (!found) {
      throw new NotFoundException(`Task with ${id} not found`);
    }

    return found;
  }

  getTasksWithFilter(filtersDto: GetTasksFilterDto): Task[] {
    const { search, status } = filtersDto;

    let tasks = this.getTasks();

    if (status) {
      tasks = this.tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = this.tasks.filter(
        (task) =>
          task.title.includes(search) || task.description.includes(search),
      );
    }

    return tasks;
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
    const found = this.getTaskById(id);
    this.tasks = this.tasks.filter((taks) => taks.id !== id);
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
