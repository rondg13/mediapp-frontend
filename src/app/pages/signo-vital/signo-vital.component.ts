import { switchMap } from 'rxjs/operators';
import { SignoVitalService } from './../../_service/signo-vital.service';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SignoVital } from './../../_model/signoVital';
import { SignoVitalDialogComponent } from './../signo-vital/signo-vital-dialog/signo-vital-dialog.component';

@Component({
  selector: 'app-signo-vital',
  templateUrl: './signo-vital.component.html',
  styleUrls: ['./signo-vital.component.css']
})
export class SignoVitalComponent implements OnInit {

  displayedColumns = ['idSignoVital','paciente','temperatura','pulso','ritmoRespiratorio','fecha','acciones'];
  dataSource: MatTableDataSource<SignoVital>;

  @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;
  @ViewChild(MatSort,{static: true}) sort: MatSort;

  constructor(private signoVitalService: SignoVitalService, private dialog : MatDialog, private snack: MatSnackBar) { }

  ngOnInit() {
    this.signoVitalService.signoVitalCambio.subscribe(data=>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.signoVitalService.mensajeCambio.subscribe(data => {
      this.snack.open(data, 'AVISO', {
        duration: 2000
      });
    });

    this.signoVitalService.listar().subscribe(data => {
      //console.log(data);
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
    
  }

  abrirDialogo(signoVital? : SignoVital){
    let sv = signoVital != null ? signoVital : new SignoVital();
    this.dialog.open(SignoVitalDialogComponent, {
      width: '250px',
      data: sv
    });
  }

  filtrar(valor : string){
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  eliminar(signoVital : SignoVital){
    this.signoVitalService.eliminar(signoVital.idSignosVitales).pipe(switchMap( () => {
      return this.signoVitalService.listar();
    })).subscribe(data => {
      this.signoVitalService.signoVitalCambio.next(data);
      this.signoVitalService.mensajeCambio.next('SE ELIMINO');
    });
  }



}
