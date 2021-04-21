import { Injectable } from '@angular/core';

@Injectable()
export class CursosService {

  getCursos(){
    return [
      {id: 1, nome: 'Angular 2'},
      {id: 2, nome: 'Java'},
      {id: 3, nome: 'C#'},
      {id: 4, nome: 'PHP'},
      {id: 5, nome: 'VisualG'}
    ];
  }

  getCurso(id: number){
    let cursos = this.getCursos();
    for (const i of cursos) {
      let curso = i;
      if (curso.id == id) {
        return curso;
      }
    }
    return null;
  }

  constructor() { }
}
