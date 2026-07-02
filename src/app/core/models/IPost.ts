export interface ISlide {
  content: string;
}

export interface IPost {
  _id?: string;
  title: string;
  category: string;
  slides: ISlide[];
  createdAt: Date;
}
