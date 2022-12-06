export interface Blog{
  id: number;
  heading: string,
  content: string,
  autherId:number,
  autherName: string,
  shortIntro: string,
  timeToRead: number
}

export class Blog{
  id: number=0;
  heading: string="";
  content: string="";
  autherId:number=0;
  autherName: string="";
  shortIntro: string="";
  timeToRead: number=0;

  constructor() {
  }

  // constructor(id:number,heading: string, content: string, author: string,timeToRead: number) {

  // }

}
