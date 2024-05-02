import { SubTarea } from "./subtarea.model";

export class Tarea {

    constructor() {        
    }
    id!: string;
    name!: string;
    description!: string;
    order!: string;
    process_id!: string;
    process_name!: string;
    subtasks!: SubTarea[];
    created_at!: string;
    updated_at!: string;
}