import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutomobileComponent } from './automobile/automobile.component';
import { BasketComponent } from './basket/basket.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { DriverComponent } from './driver/driver.component';

const routes: Routes = [
{path:'driver',component:DriverComponent},
{path:'delivery',component:DeliveryComponent},
{path:'auto',component:AutomobileComponent},
{path:'basket',component:BasketComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
