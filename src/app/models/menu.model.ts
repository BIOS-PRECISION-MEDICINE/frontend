import { SubMenu } from './subMenu.model';

export class Menu {

    constructor(
        public titulo: string,
        public icono: string,
        public subMenu: Array<SubMenu>,

    ){}
}
