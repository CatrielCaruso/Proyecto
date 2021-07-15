import { Hospital } from './hospital.model';

export class MedicoUser {
  constructor(
  public _id: any,
  public nombre: string,
  public img: string,
  ){}
}

export class Medico {
  constructor(
    public nombre: string,
    public _id?: any,
    public img?: any,
    public usuario?: MedicoUser,
    public hospital?: Hospital
  ) {}
}
