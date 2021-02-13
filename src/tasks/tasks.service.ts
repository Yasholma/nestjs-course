import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v1 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters(filteredDto: GetTasksFilterDto): Task[] {
    const { search, status } = filteredDto;
    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter((t) => t.status === status);
    }

    if (search) {
      tasks = tasks.filter(
        (t) => t.title.includes(search) || t.description.includes(search),
      );
    }

    return tasks;
  }

  getTaskById(id: string): Task {
    const found = this.tasks.find((t) => t.id === id);
    if (!found) {
      throw new NotFoundException('Task not found.');
    }
    return found;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  updateTask(id: string, updateTaskDto: CreateTaskDto): Task {
    const found = this.getTaskById(id);

    found.title = updateTaskDto?.title || found.title;
    found.description = updateTaskDto?.description || found.description;

    return found;
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    const found = this.getTaskById(id);

    found.status = status;
    return found;
  }

  deleteTask(id: string): void {
    this.tasks = this.tasks.filter((t) => t.id !== id);
  }
}
