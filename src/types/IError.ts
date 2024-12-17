export interface IError {
  message: string;
  errors: { [key: string]: string };
}
