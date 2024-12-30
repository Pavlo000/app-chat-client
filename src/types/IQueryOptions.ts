export interface IQueryOptions {
  offset: number,
  limit: number,
  sortBy: string,
  order: 'asc' | 'desc',
  search: string,
}
