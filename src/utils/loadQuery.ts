import { IQueryOptions } from '../types';
import { IHttpListResponse } from '../types/IHttpResponse';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const loadQuery = <T, D>(callback: (...args: any) => Promise<IHttpListResponse<T>>, query: Partial<IQueryOptions>, ...data: D[]) => {
  return callback(
    ...data,
    {
      ...query,
      offset: query?.offset ?? 0,
      limit: query?.limit ?? 10,
    }
  );
};

