import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EquipoService {

  url= '/persona';
  constructor(private http: HttpClient) { }

 //get personas
 getEquipos()
 {
   return this.http.get(this.url);
 }

 //get una persona
 getUnEquipo(id:string){
  return this.http.get(this.url+'/'+id);
}


//agregar equipo
addEquipo(equipo:Equipo)
{
  return this.http.post(this.url, equipo);
}


//eliminar
deleteEquipo(id:string){
  return this.http.delete(this.url+'/'+id);
}
}

export interface Equipo{
  id?: string;
  nombre?:string;
  apellido?:string;
  peso_inicial?:string;
  peso_meta?:string;
  tallas_iniciales?:string;
  tallas_metas?:string;

}
