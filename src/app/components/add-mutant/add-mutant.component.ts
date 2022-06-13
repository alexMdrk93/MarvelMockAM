import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MutantsService } from 'src/app/services/mutants.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-add-mutant',
  templateUrl: './add-mutant.component.html',
  styleUrls: ['./add-mutant.component.css']
})
export class AddMutantComponent implements OnInit {

  mutantForm !: FormGroup
  actionBtn: string = "Save"

  constructor(private formBuilder: FormBuilder, private mutantService: MutantsService, private dialogRef: MatDialogRef<AddMutantComponent>, @Inject(MAT_DIALOG_DATA) public editdata: any, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.mutantForm = this.formBuilder.group({
      nume: '',
      prenume: '',
      numeDeErou: '',
      numeSuper: '',
      img: ''
    });

    if(this.editdata){
      this.actionBtn = "Update";
      this.mutantForm.controls['nume'].setValue(this.editdata.nume);
      this.mutantForm.controls['prenume'].setValue(this.editdata.prenume);
      this.mutantForm.controls['numeDeErou'].setValue(this.editdata.numeDeErou);
      this.mutantForm.controls['numeSuper'].setValue(this.editdata.numeSuper);
      this.mutantForm.controls['img'].setValue(this.editdata.img);
    }
    
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

  updateMutant() {
    this.mutantService.updateMutants(this.mutantForm.value, this.editdata.id).subscribe({
      next: (res)=>{
        this.openSnackBar("Eroul a fost actualizat cu succes", "Ok");
          this.mutantForm.reset();
          this.dialogRef.close('update')
      },
      error: ()=>{
        this.openSnackBar("Eroare la actualizare erou", "Inchide")
      }
    })
  }

  onSubmit(){
    if(!this.editdata){
      this.mutantService.addMutant(this.mutantForm.value).subscribe({
        next: (res)=>{
          this.openSnackBar("Eroul a fost creat cu succes", "Ok");
          this.mutantForm.reset();
          this.dialogRef.close('save')
        }
      });
    }else{
      this.updateMutant()
    }
  }
  }