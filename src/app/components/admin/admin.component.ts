import { Component, Input, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { map, tap } from 'rxjs';
import { Mutants } from 'src/app/Mutants';
import { MutantsService } from 'src/app/services/mutants.service';
import { AddMutantComponent } from '../add-mutant/add-mutant.component';
import { MatDialog } from '@angular/material/dialog';
import { ThemePalette } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})

export class AdminComponent implements OnInit {
  @Input() backgroundColor: ThemePalette;
  @Input() color: ThemePalette;
  mutants: Mutants[] = [];
  title = 'Create mutant modal';
  displayedColumns: string[] = ['nume', 'prenume', 'numeDeErou', 'numeSuper', 'Actiuni'];
  dataSource!: MatTableDataSource<Mutants>;
  @ViewChild(MatPaginator)   paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private mutantService: MutantsService, public dialog: MatDialog) {}

  ngOnInit(): void {this.getMutants()}

  addMutants(mutant: Mutants){
    this.mutantService.addMutant(mutant).subscribe((mutant)=>(this.mutants.push(mutant)))
  }
  
  getMutants(){
    this.mutantService.getMutants().pipe(
      map(mutants => { 
        return mutants.map(
          (mutant) =>({
            id: mutant.id,
            nume: mutant.nume,
            prenume: mutant.prenume,
            numeDeErou: mutant.numeDeErou,
            numeSuper: mutant.MutantPowers[0].numeSuper,
            img: mutant.img
          }),
          )
        }),
        tap(console.log)
    )
    .subscribe((mutant) => {this.mutants = mutant; this.dataSource = new MatTableDataSource(mutant); this.dataSource.paginator = this.paginator; this.dataSource.sort = this.sort})
  }

  editMutants(row:any){
    this.dialog.open(AddMutantComponent,{
      width: '30%',
      data:row
    }).afterClosed().subscribe(val => {
      if(val === 'update'){
        this.getMutants();
      }
     });
  }

  deleteMutant(id: number){
    this.mutantService.deleteMutants(id).subscribe({
      next: (res)=>{
        alert("Eroul a fost sters cu succes");
      },
      error: ()=>{
        alert('Eroare la stergere erou')
      },
      complete: ()=>{
        this.getMutants()
      }
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddMutantComponent, {
      width: '30%'
    });

    dialogRef.afterClosed().subscribe(val => {
     if(val === 'save'){
       this.getMutants();
     }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  }

