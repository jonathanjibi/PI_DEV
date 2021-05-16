import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AutomobileService } from '../automobile.service';
import { automobile } from '../model/automobile';

@Component({
  selector: 'app-automobile',
  templateUrl: './automobile.component.html',
  styleUrls: ['./automobile.component.css']
})
export class AutomobileComponent implements OnInit {

  public autos:automobile[];
  public test :boolean=false ; 
   
   constructor(private automobileService:AutomobileService) { 
     this.autos=[];
     
   }
 
   ngOnInit(): void {
     this.getDrivers();
   }
   public getDrivers():void {
     this.automobileService.getDrivers().subscribe(
       (response:automobile[])=>{
         this.autos=response;
       },
       (error : HttpErrorResponse)=>{
         alert(error.message);
       }
     );
     }
     public onAddEmloyee(addForm: NgForm): void {
      // document.getElementById('add-employee-form').click();
       this.automobileService.addDriver(addForm.value).subscribe(
        (response:automobile)=>{
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
     public onDeleteDeliveryman(idAuto: number){
      this.automobileService.deleteDriver(idAuto).subscribe(()=>this.automobileService.getDrivers().subscribe(res=>{this.autos=res}));
    }
    public searchDeliveryman(key: string): void {
      console.log(key);
      const results: automobile[] = [];
      for (const employee of this.autos) {
        if (employee.typeAuto.toLowerCase().indexOf(key.toLowerCase()) !== -1
        /*|| employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || employee.phonenumber.toLowerCase().indexOf(key.toLowerCase()) !== -1)*/)
         {
          results.push(employee);
        }
      }
      this.autos = results;
  
}

}
