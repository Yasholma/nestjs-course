import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private readonly taskRepository: TaskRepository,
  ) {}

  async getTasks(filteredDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    return await this.taskRepository.getTasks(filteredDto, user);
  }

  async getTaskById(id: number, user: User): Promise<Task> {
    const found = await this.taskRepository.findOne({
      where: { id, userId: user.id },
    });
    if (!found) {
      throw new NotFoundException(`Task with ID: "${id}" not found.`);
    }
    return found;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user);
  }

  async updateTask(
    id: number,
    updateTaskDto: UpdateTaskDto,
    user: User,
  ): Promise<Task> {
    const { title, description } = updateTaskDto;
    const task = await this.getTaskById(id, user);
    task.title = title;
    task.description = description;
    await task.save();
    return task;
  }

  async updateTaskStatus(
    id: number,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = status;
    await task.save();
    return task;
  }

  async deleteTask(id: number, user: User): Promise<void> {
    const res = await this.taskRepository.delete({ id, userId: user.id });
    if (res.affected === 0) {
      throw new NotFoundException(`Task with ID: "${id}" not found.`);
    }
  }
}
