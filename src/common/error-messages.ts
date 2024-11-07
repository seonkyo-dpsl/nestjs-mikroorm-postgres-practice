export class ErrorMessages {
  static readonly internalServerError = '서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.';
  static readonly notFoundTarget = (target: string) => `${target} 대상을 찾을 수 없습니다.`;
}
