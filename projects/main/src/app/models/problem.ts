import{Contest} from './contest'
export interface Io{
  in:string,
  out:string
}

export interface Problem{
  _id: string,
  title: string,
  content: {
    contentPDF: Array<string>
    ioSample: Array<Io>
  },
  contest: string,
  io: Array<Io>
}
