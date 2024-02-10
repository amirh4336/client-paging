export interface IDataProgrammer {
  id: number;
  name: string;
  skills: string;
  mobile: string;
  email: string;
  imageUrl: string;
  facebook: string;
  twitter: string;
  linkedin: string;
  telegram: string;
}

export interface IData<T> {
  totalRecords: number;
  data: T[];
}
