import {User} from './user'
import {Problem} from './problem'

export interface Picture{
  url:string
}



export interface Contest{
  _id: string,
  title:string,
  pictures?: Array<Picture>,
  writer: User,
  content: string,
  problems?: Array<Problem>,
  registerPeriod: {
    from: Date, //등록 기간
    to: Date
  },
  progressPeriod: {
    from: any, //시간
    to: any
  },
  attendedStudents?: Array<User>
}
