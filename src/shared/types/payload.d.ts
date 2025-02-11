export interface Payload {
  [key: string]: string | string[] | number | boolean | Payload | Payload[] | undefined
}
