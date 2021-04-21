import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursosDetalheComponent } from './cursos-detalhe/cursos-detalhe.component';
import { CursosComponent } from './cursos.component';
import { CursosService } from './cursos.service';



@NgModule({
  declarations: [
    CursosDetalheComponent,
    CursosComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CursosComponent
  ],
  providers: [
    CursosService
  ]
})
export class CursosModule { }
