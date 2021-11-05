import { Controller, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Privilege } from 'src/roles/interfaces/role.interface';
import { Agent } from 'src/__shared__/decorators/agent.decorator';
import { WithPrivilege } from 'src/__shared__/decorators/with-privilege.decorator';
import { ResponseDto } from 'src/__shared__/dto/response.dto';
import { AgentGuard } from 'src/__shared__/guards/agent.guard';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskDto } from './dto/get-task.dto';
import { GetTasksDto } from './dto/get-tasks.dto';
import { TaskResponseDto, TasksResponseDto } from './dto/response.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AgentGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @WithPrivilege(Privilege.CREATE_TASK)
  @MessagePattern('create')
  async create(
    @Agent() agent,
    @Payload() createTaskDto: CreateTaskDto,
  ): Promise<TaskResponseDto> {
    return this.tasksService.create(createTaskDto, agent);
  }

  @MessagePattern('getAll')
  async getAll(
    @Agent() agent,
    @Payload() getTasksDto: GetTasksDto,
  ): Promise<TasksResponseDto> {
    return this.tasksService.findAll(getTasksDto, agent);
  }

  @MessagePattern('getOne')
  async getOne(
    @Agent() agent,
    @Payload() { id }: GetTaskDto,
  ): Promise<TaskResponseDto> {
    return this.tasksService.findOne(id, agent);
  }

  @MessagePattern('update')
  async update(
    @Agent() agent,
    @Payload() updateTaskDto: UpdateTaskDto,
  ): Promise<TaskResponseDto> {
    return this.tasksService.update(updateTaskDto, agent);
  }

  @MessagePattern('delete')
  async remove(
    @Agent() agent,
    @Payload() { id }: GetTaskDto,
  ): Promise<ResponseDto> {
    return this.tasksService.remove(id, agent);
  }

  @MessagePattern('restore')
  async restore(
    @Agent() agent,
    @Payload() { id }: GetTaskDto,
  ): Promise<TaskResponseDto> {
    return this.tasksService.restore(id, agent);
  }
}
