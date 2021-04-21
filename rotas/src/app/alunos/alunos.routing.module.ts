import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AlunosDeactivateGuard } from "../guards/alunos-deactivate.guard";
import { AlunosGuard } from "../guards/alunos.guard";
import { AlunoFormComponent } from "./aluno-form/aluno-form.component";
import { AlunosDetalheComponent } from "./alunos-detalhe/alunos-detalhe.component";
import { AlunosComponent } from "./alunos.component";
import { AlunoDetalheResolver } from "./guards/aluno-detalhe.resolver";

const alunosRoutes = [
  {path: '', component: AlunosComponent,
  canActivateChild: [AlunosGuard],
  children:[
    {path: 'novo', component: AlunoFormComponent,
    canDeactivate: [AlunosDeactivateGuard]
    },
    {path: ':id', component: AlunosDetalheComponent,
      resolve: { aluno : AlunoDetalheResolver}
    },
    {path: ':id/editar', component: AlunoFormComponent,
      canDeactivate: [AlunosDeactivateGuard]
    }
  ]}
];



@NgModule({
  imports: [RouterModule.forChild(alunosRoutes)],
  exports: [RouterModule]
})

export class AlunosRoutingModule {}
