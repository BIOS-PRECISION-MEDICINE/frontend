import { Component } from '@angular/core';

@Component({
  selector: 'app-manage-execution-pipeline',
  templateUrl: './manage-execution-pipeline.component.html',
  styleUrls: ['./manage-execution-pipeline.component.css']
})
export class ManageExecutionPipelineComponent {
  selectedTab: string = 'Home';

  setTab(tab: string) {
    this.selectedTab = tab; // Actualizar el valor del tab seleccionado
  }
}
