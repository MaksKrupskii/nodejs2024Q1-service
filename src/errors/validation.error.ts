import { validationErrors } from './dbErrors';

export class ValidationError extends Error {
  code: number;
  path: string;
  constructor(code: number, path?: string) {
    super(validationErrors[code as keyof typeof validationErrors]);
    this.code = code;
    this.path = path;
  }
}
