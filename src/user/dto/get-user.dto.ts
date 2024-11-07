import { IsInt, Min } from 'class-validator';

export class GetUserDto {
  @Min(0)
  @IsInt()
  id: number;
}
