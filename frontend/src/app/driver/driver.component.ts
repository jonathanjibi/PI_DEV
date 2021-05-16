import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DriverService } from '../driver.service';
import { driver } from '../model/driver';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {

 public deliverymans:driver[];
 public driverM:driver[];
 public test :boolean=false ; 
  
  constructor(private deliverymanService:DriverService) { 
    this.deliverymans=[];
    this.driverM=[];
    
  }

  ngOnInit(): void {
    this.getDeliveryman();
  }
  public getDeliveryman():void {
    this.deliverymanService.getDrivers().subscribe(
      (response:driver[])=>{
        this.deliverymans=response;
      },
      (error : HttpErrorResponse)=>{
        alert(error.message);
      }
    );
    }
    public onAddEmloyee(addForm: NgForm): void {
      // document.getElementById('add-employee-form').click();
       this.deliverymanService.addDriver(addForm.value).subscribe(
        (response:driver)=>{
           console.log(response);
           this.getDeliveryman();
           addForm.reset();
         },
         (error: HttpErrorResponse) => {
           alert(error.message);
           addForm.reset();
         }
       );
     }
     public onDeleteDeliveryman(idDriver: number){
      this.deliverymanService.deleteDriver(idDriver).subscribe(()=>this.deliverymanService.getDrivers().subscribe(res=>{this.deliverymans=res}));
    }
    public searchDeliveryman(key: string): void {
      console.log(key);
      const results: driver[] = [];
      for (const employee of this.deliverymans) {
        if (employee.lastName.toLowerCase().indexOf(key.toLowerCase()) !== -1
        /*|| employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || employee.phonenumber.toLowerCase().indexOf(key.toLowerCase()) !== -1)*/)
         {
          results.push(employee);
        }
      }
      this.deliverymans = results;
  
}




}
