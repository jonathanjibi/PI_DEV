import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BasketService } from '../basket.service';
import { basket } from '../model/basket';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  public baskets:basket[];
  public test :boolean=false ; 
   
   constructor(private basketService:BasketService) { 
     this.baskets=[];
     
   }
 
   ngOnInit(): void {
     this.getDrivers();
   }
   public getDrivers():void {
     this.basketService.getDrivers().subscribe(
       (response:basket[])=>{
         this.baskets=response;
       },
       (error : HttpErrorResponse)=>{
         alert(error.message);
       }
     );
     }
     public onAddEmloyee(addForm: NgForm): void {
      // document.getElementById('add-employee-form').click();
       this.basketService.addDriver(addForm.value).subscribe(
        (response:basket)=>{
           console.log(response);
           this.getDrivers();
           addForm.reset();
         },
         (error: HttpErrorResponse) => {
           alert(error.message);
           addForm.reset();
         }
       );
     }
     public onDeleteDeliveryman(basketId: number){
      this.basketService.deleteDriver(basketId).subscribe(()=>this.basketService.getDrivers().subscribe(res=>{this.baskets=res}));
    }
    

}
