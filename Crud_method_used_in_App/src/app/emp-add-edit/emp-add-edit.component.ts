import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../service/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../service/core.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss']
})
export class EmpAddEditComponent implements OnInit{

  empForm : FormGroup;

  education : string[] = [
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate',
  ];

  constructor (
    private _fb : FormBuilder, 
    private empService : EmployeeService, 
    private _coreService : CoreService,
    private _dialogRef : MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any

    ){ 
    this.empForm = this._fb.group({
      firstName:'',
      lastName:'',
      email:'',
      dob:'',
      gender:'',
      education:'',
      company:'',
      experience:'',
      package:'',
    })
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data)
  }

  onFormSubmit(){
    if(this.empForm.valid){
      if(this.data){
        this.empService.updateEmployee(this.data.id,this.empForm.value).subscribe({
          next : (val : any) =>{
            this._coreService.openSnackBar('Employee Details Updated Successfully..!')
            this._dialogRef.close(true);
          },
          error: (err : any) => {
            console.log(err);
          },
        })
      }else{
        this.empService.addEmployee(this.empForm.value).subscribe({
          next : (val : any) =>{
            this._coreService.openSnackBar('Employee Added Successfully..!')
            this._dialogRef.close(true);
          },
          error: (err : any) => {
            console.log(err);
          },
        })
      }
    }
  }
}
