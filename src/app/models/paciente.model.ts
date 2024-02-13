import { Examen } from "./exam.model";

export class Paciente {

    constructor() {        
    }
    id!: string;
    name!: string;
    lastname!: string;
    document!: string;
    birth_year!: string;
    created_at!: string;
    updated_at!: string;
    exams!:Examen[];

}