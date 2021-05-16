import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DriverComponent } from './driver/driver.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { AutomobileComponent } from './automobile/automobile.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DriverService } from './driver.service';
import { BasketComponent } from './basket/basket.component';

@NgModule({
  declarations: [
    AppComponent,
    DriverComponent,
    DeliveryComponent,
    AutomobileComponent,
    BasketComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
     FormsModule
  ],
  providers: [DriverService],
  bootstrap: [AppComponent]
})
export class AppModule { }
