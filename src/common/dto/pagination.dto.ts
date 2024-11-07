import { IsInt, Max, Min } from 'class-validator';
import { MAX_LIMIT } from '../../common/constant';

export class PaginationDto {
  @Min(0)
  @IsInt()
  offset: number;

  @Max(MAX_LIMIT)
  @Min(0)
  @IsInt()
  limit: number;
}
