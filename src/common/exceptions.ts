import { NotFoundException } from '@nestjs/common';
import { ErrorMessages } from './error-messages';

export class Exceptions {
  static readonly notFoundTarget = (target: string) =>
    new NotFoundException(ErrorMessages.notFoundTarget(target));
}
