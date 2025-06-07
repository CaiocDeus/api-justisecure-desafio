import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { IsString, IsEnum, IsOptional } from 'class-validator';
import { TaskStatus } from '../enums/task-status.enum';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
    @IsString()
    title?: string;

    @IsString()
    description?: string;

    @IsEnum(TaskStatus)
    @IsOptional()
    status?: TaskStatus;
}
