import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DeliveryService } from '../delivery.service';
import { delivery } from '../model/delivery';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {

  public deliveries:delivery[];
 public test :boolean=false ; 
  
  constructor(private deliveryService:DeliveryService) { 
    this.deliveries=[];
    
  }

  ngOnInit(): void {
    this.getDeliveries();
  }
  public getDeliveries():void {
    this.deliveryService.getDeliveries().subscribe(
      (response:delivery[])=>{
        this.deliveries=response;
      },
      (error : HttpErrorResponse)=>{
        alert(error.message);
      }
    );
    }
    public onAddEmloyee(addForm: NgForm): void {
      // document.getElementById('add-employee-form').click();
       this.deliveryService.addDriver(addForm.value).subscribe(
        (response:delivery)=>{
           console.log(response);
           this.getDeliveries();
           addForm.reset();
         },
         (error: HttpErrorResponse) => {
           alert(error.message);
           addForm.reset();
         }
       );
     }
     public onDeleteEmloyee( deliveryId: number){
      this.deliveryService.deleteDelivery(deliveryId).subscribe(()=>this.deliveryService.getDeliveries().subscribe(res=>{this.deliveries=res}));
    }
    public searchDeliveryman(key: string): void {
      console.log(key);
      const results: delivery[] = [];
      for (const employee of this.deliveries) {
        if (employee.dateDelivery.toLowerCase().indexOf(key.toLowerCase()) !== -1
        /*|| employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || employee.phonenumber.toLowerCase().indexOf(key.toLowerCase()) !== -1)*/)
         {
          results.push(employee);
        }
      }
      this.deliveries = results;
  
}


  }
