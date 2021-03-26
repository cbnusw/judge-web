export interface ListData<T> {
  total: number;
  page: number;
  limit: number;
  documents: Array<T>;
}

export interface Response<T> {
  success: boolean;
  status: number;
  message: string;
  data: T;
}

export interface ListResponse<T> extends Response<ListData<T>> {
}
