export interface IHttpSingleResponse<T> {
  success: true,
  data: T,
}

export interface IHttpListResponse<T> {
  success: true,
  data: {
    items: T[],
    total: number,
    offset: number,
  },
}
