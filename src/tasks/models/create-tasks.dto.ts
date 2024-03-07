import { IsNotEmpty, isNotEmpty } from 'class-validator';

export class CreateTasksDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
