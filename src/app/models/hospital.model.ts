
interface _HospitalUser{

   _id:string,
   nombre:string,
   img:string,


}





export class Hospital{


  constructor(

     public nombre:string,
     public _id?:any,
     public usuario?:_HospitalUser,
     public img?:any,



  ){
    




  }

}