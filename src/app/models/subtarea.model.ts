import { Parametro } from "./parametro.model";
import { Tarea } from "./tarea.model";

export class SubTarea {

    constructor() {        
    }
    id!: number;
    name!: string;
    description!: string;
    order!: string;
    command!: string;
    task_id!: string;
    created_at!: string;
    updated_at!: string;
    task!: Tarea;
    input_params!: Parametro[];
    output_params!: Parametro[];
}