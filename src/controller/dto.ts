export interface Entries {
  API: string;
  Description: string;
  Auth: string;
  HTTPS: boolean | string;
  Cors: string;
  Link: string;
  Category: string;
}
export interface ResponseI {
  count: number;
  entries: Entries[];
}
