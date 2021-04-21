import { PocAsyncComponent } from './componentes/poc-async.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnsubscribePocComponent } from './unsubscribe-poc/unsubscribe-poc.component';
import { UnsubscribeRxjsRoutingModule } from './unsubscribe-rxjs-routing.module';
import { PocBaseComponent } from './poc-base/poc-base.component';
import { PocComponent } from './componentes/poc.component';
import { PocUnsubComponent } from './componentes/poc-unsub.component';
import { PocTakeComponent } from './componentes/poc-take.component';
import { PocTakeUntilComponent } from './componentes/poc-take-until.component';



@NgModule({
  declarations: [
    UnsubscribePocComponent,
    PocBaseComponent,
    PocComponent,
    PocUnsubComponent,
    PocTakeComponent,
    PocTakeUntilComponent,
    PocAsyncComponent
  ],
  imports: [
    CommonModule,
    UnsubscribeRxjsRoutingModule
  ]
})
export class UnsubscribeRxjsModule { }
