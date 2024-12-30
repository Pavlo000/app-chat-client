export interface IErrorResponse {
  success: false;
  message: string;
  errors: { [key: string]: string };
}
