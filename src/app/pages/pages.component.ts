import { Component, OnInit } from '@angular/core';

import { SidebarService } from '../services/sidebar.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
  isActive: boolean;
  year = new Date().getUTCFullYear();
  constructor(private sidebarService: SidebarService) {
    this.isActive = false;
  }

  ngOnInit(): void {
    // Permite cargar el menú para el sidebar.
    const item = localStorage.getItem('token');
    if (item !== null) {
      this.isActive = true;
      console.log("Si existe")
    } else {
      this.isActive = false;
      console.log("NO existe")
    }
    this.sidebarService.loadMenu();
  }
}
