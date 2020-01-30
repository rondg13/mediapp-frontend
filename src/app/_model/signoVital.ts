import { Paciente } from './paciente';

export class SignoVital{
    idSignosVitales:number;
    paciente:Paciente;
    fecha:Date;
    temperatura:string;
    pulso:string;
    ritmoRespiratorio:string;
}