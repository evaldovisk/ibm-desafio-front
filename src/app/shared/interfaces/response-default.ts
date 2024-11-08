export interface ResponseDefault<T> {
  timestamp: string;
  status: number;
  message: string | null;
  data: T;
}
