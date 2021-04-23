import{Contest} from './contest'
export interface Io{
  in:string,
  out:string
}

export interface Problem{
  _id: string,
  no?: number,
  title: string,
  content: {
    explainProblem:string,
    explainInput: string,
    explainOutput: string
    ioSample: Array<Io>
  },
  contest: Contest,
  io: Array<Io>
}
