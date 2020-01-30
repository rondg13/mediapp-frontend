import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { PacienteService } from './../../../_service/paciente.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Paciente } from './../../../_model/paciente';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-paciente-modal',
  templateUrl: './paciente-modal.component.html',
  styleUrls: ['./paciente-modal.component.css']
})
export class PacienteModalComponent implements OnInit {

  paciente: Paciente;

  constructor(
    private dialogRef: MatDialogRef<PacienteModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Paciente,
    private pacienteService: PacienteService,
    private router : Router,
  ) { }

  ngOnInit() {

    this.paciente= new Paciente();
    this.paciente.nombres= this.data.nombres;
    this.paciente.apellidos=this.data.apellidos;
    this.paciente.dni=this.data.dni;
    this.paciente.direccion=this.data.direccion;
    this.paciente.telefono=this.data.telefono;

  }

  operar() {
    if (this.paciente != null ) {
      
      //console.log(this.signoVital);
      this.pacienteService.registrar(this.paciente).pipe(switchMap( data=> {
        //console.log(data);
        this.pacienteService.pacienteAgregado.next(data);
        return this.pacienteService.listar();
      })).subscribe(data => {
        
        this.pacienteService.pacienteCambio.next(data);
        this.pacienteService.mensajeCambio.next('SE AGREGÓ');
        
      }); 

      //this.router.navigate(['signo-vital/nuevo']);
    } 
    this.dialogRef.close();
  }

  cancelar() {
    this.dialogRef.close();
  }

}
