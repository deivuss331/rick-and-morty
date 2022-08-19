export interface AppConfig {
  graphQl: {
    uri: string;
  };
}

export interface ApiPageable {
  pages: number;
  count: number;
  prev: number | null;
  next: number | null;
}
