import { MatSnackBar, MatDialog } from '@angular/material';
import { map } from 'rxjs/operators';
import { Paciente } from './../../../_model/paciente';
import { SignoVital } from './../../../_model/signoVital';
import { SignoVitalService } from './../../../_service/signo-vital.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PacienteService } from './../../../_service/paciente.service';
import { PacienteModalComponent } from '../../paciente/paciente-modal/paciente-modal.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  form: FormGroup;
  id: number;
  edicion: boolean;

  pacientes: Paciente[] = [];
  myControlPaciente: FormControl = new FormControl();
  pacienteSeleccionado: Paciente;
  pacientesFiltrados: Observable<any[]>;

  constructor(
    private route: ActivatedRoute,
    private pacienteService: PacienteService,
    private router : Router,
    private signoVitalService: SignoVitalService,
    private dialog : MatDialog
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      'id': new FormControl(0),
      'paciente': this.myControlPaciente,
      'fecha' : new FormControl('', Validators.required),
      'temperatura' : new FormControl(''),
      'pulso' : new FormControl(''),
      'ritmoRespiratorio' : new FormControl('')
    });

    this.pacienteService.pacienteAgregado.subscribe(data=>{
      //console.log(data);

      this.form = new FormGroup({
        'id': new FormControl(0),
        'paciente': new FormControl(data),
        'fecha' : new FormControl('', Validators.required),
        'temperatura' : new FormControl(''),
        'pulso' : new FormControl(''),
        'ritmoRespiratorio' : new FormControl('')
      });
      
    });

    this.pacienteService.pacienteCambio.subscribe(data=>{
      this.pacientes=data;
    });

    this.listarPacientes();
    this.pacientesFiltrados = this.myControlPaciente.valueChanges.pipe(map(val => this.filtrarPacientes(val)));
  }
  filtrarPacientes(val : any){    
    console.log(val);
    if (val != null && val.idPaciente > 0) {
      return this.pacientes.filter(option =>
        option.nombres.toLowerCase().includes(val.nombres.toLowerCase()) || option.apellidos.toLowerCase().includes(val.apellidos.toLowerCase()) || option.dni.includes(val.dni));
    } else {
      return this.pacientes.filter(option =>
        option.nombres.toLowerCase().includes(val.toLowerCase()) || option.apellidos.toLowerCase().includes(val.toLowerCase()) || option.dni.includes(val));
    }
  }

  mostrarPaciente(val : Paciente){
    return val ? `${val.nombres} ${val.apellidos}` : val;
  }

  seleccionarPaciente(e: any) {
    this.pacienteSeleccionado = e.option.value;
  }

  listarPacientes() {
    this.pacienteService.listar().subscribe(data => {
      this.pacientes = data;
    });
  }

  operar(){

    //TE ASEGURAS QUE EL FORM ESTE VALIDO PARA PROSEGUIR
    if(this.form.invalid){
      return;
    }

    let signoVital = new SignoVital();
    signoVital.idSignosVitales = this.form.value['id'];
    signoVital.paciente = this.form.value['paciente'];
    var tzoffset = (this.form.value['fecha']).getTimezoneOffset() * 60000;
    var localISOTime = (new Date(Date.now() - tzoffset))
    signoVital.fecha = localISOTime;
    signoVital.temperatura = this.form.value['temperatura'];
    signoVital.pulso = this.form.value['pulso'];
    signoVital.ritmoRespiratorio = this.form.value['ritmoRespiratorio'];
      //servicio de registro
      console.log(signoVital);
      this.signoVitalService.registrar(signoVital).subscribe( () => {
        this.signoVitalService.listar().subscribe(data => {
          this.signoVitalService.signoVitalCambio.next(data);
          this.signoVitalService.mensajeCambio.next('SE REGISTRO');
        });
      });
    
    this.router.navigate(['signo-vital']);
  }

  abrirModal(){
    let paciente = new Paciente();
    this.dialog.open(PacienteModalComponent, {
      width: '250px',
      data: paciente
    });
  }

}
