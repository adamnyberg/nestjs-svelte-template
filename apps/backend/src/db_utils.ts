import { Err, Result } from 'ts-results';

export function catchDbErrors() {
  return function (target: any, _: any, descriptor: any) {
    const method = descriptor.value;

    descriptor.value = async function (
      ...args: any
    ): Promise<Result<any, DbErrors>> {
      try {
        return await method.apply(this, args);
      } catch (err) {
        if (err.code === 'P2025') {
          return Err(DbErrors.NOT_FOUND);
        }
        throw err;
      }
    };
  };
}

export enum DbErrors {
  NOT_FOUND = 'Entity not found',
}
