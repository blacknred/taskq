import { Controller, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Privilege } from 'src/workspaces/interfaces/workspace.interface';
import { Agent } from 'src/__shared__/decorators/agent.decorator';
import { WithPrivilege } from 'src/__shared__/decorators/with-privilege.decorator';
import { ResponseDto } from 'src/__shared__/dto/response.dto';
import { AgentGuard } from 'src/__shared__/guards/agent.guard';
import { CreateTaskDto } from './dto/delete-tag.dto';
import { GetTaskDto } from './dto/get-tag.dto';
import { GetTasksDto } from './dto/get-tags.dto';
import { TaskResponseDto, TasksResponseDto } from './dto/tag-response.dto';
import { UpdateTaskDto } from './dto/update-tag.dto';
import { TasksService } from './issues.service';

@Controller()
@UseGuards(AgentGuard)
export class IssuesController {
  constructor(private readonly tasksService: TasksService) {}

  @WithPrivilege(Privilege.CREATE_TASK)
  @MessagePattern('tasks/create')
  async create(
    @Agent() agent,
    @Payload() createTaskDto: CreateTaskDto,
  ): Promise<TaskResponseDto> {
    return this.tasksService.create(createTaskDto, agent);
  }

  @MessagePattern('tasks/getAll')
  async getAll(
    @Agent() agent,
    @Payload() getTasksDto: GetTasksDto,
  ): Promise<TasksResponseDto> {
    return this.tasksService.findAll(getTasksDto, agent);
  }

  @MessagePattern('tasks/getOne')
  async getOne(
    @Agent() agent,
    @Payload() { id }: GetTaskDto,
  ): Promise<TaskResponseDto> {
    return this.tasksService.findOne(id, agent);
  }

  @MessagePattern('tasks/update')
  async update(
    @Agent() agent,
    @Payload() updateTaskDto: UpdateTaskDto,
  ): Promise<TaskResponseDto> {
    return this.tasksService.update(updateTaskDto, agent);
  }

  @MessagePattern('tasks/delete')
  async remove(
    @Agent() agent,
    @Payload() { id }: GetTaskDto,
  ): Promise<ResponseDto> {
    return this.tasksService.remove(id, agent);
  }
}
