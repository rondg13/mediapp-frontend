import { switchMap } from 'rxjs/operators';
import { SignoVitalService } from './../../../_service/signo-vital.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SignoVital } from './../../../_model/signoVital';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-signo-vital-dialog',
  templateUrl: './signo-vital-dialog.component.html',
  styleUrls: ['./signo-vital-dialog.component.css']
})
export class SignoVitalDialogComponent implements OnInit {

  signoVital: SignoVital;
  nombrePaciente: string;

  
  
  constructor(
    private dialogRef: MatDialogRef<SignoVitalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: SignoVital,
    private signoVitalService: SignoVitalService
  ) { }

  ngOnInit() {

    this.signoVital= new SignoVital();
    this.signoVital.idSignosVitales= this.data.idSignosVitales;
    this.signoVital.paciente= this.data.paciente;
    this.signoVital.temperatura= this.data.temperatura;
    this.signoVital.pulso= this.data.pulso;
    this.signoVital.ritmoRespiratorio= this.data.ritmoRespiratorio;
    this.signoVital.fecha= this.data.fecha;
    if( this.data != null && this.data.idSignosVitales>0){
      this.nombrePaciente= `Paciente: ${this.data.paciente.nombres} ${this.data.paciente.apellidos}`;  
    }else{
      this.nombrePaciente='Registrar signo Vital';
    }
    
  }

  operar() {
    if (this.signoVital != null && this.signoVital.idSignosVitales > 0) {
      //MODIFICAR
      //BUEN PRACTICA
      //console.log(this.signoVital);
      this.signoVitalService.modificar(this.signoVital).pipe(switchMap( ()=> {
        return this.signoVitalService.listar();
      })).subscribe(data => {
        this.signoVitalService.signoVitalCambio.next(data);
        this.signoVitalService.mensajeCambio.next('SE MODIFICO');
      });
    } /*else {
      //REGISTRAR
      //PRACTICA COMUN
      this.signoVitalService.registrar(this.signoVital).subscribe(() => {
        this.signoVitalService.listar().subscribe(data => {
          this.signoVitalService.signoVitalCambio.next(data);
          this.signoVitalService.mensajeCambio.next('SE REGISTRO');
        });
      });
    }*/
    this.dialogRef.close();
  }

  cancelar() {
    this.dialogRef.close();
  }

}
