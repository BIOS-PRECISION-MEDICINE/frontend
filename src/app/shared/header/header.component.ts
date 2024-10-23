import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';
import { googleCredentials } from 'src/app/interfaces/googleCredentials';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public usuario: Usuario;
  public notifications: any[] = []

  constructor(private usuarioService: UsuarioService,
    private router: Router,
    private webSocketService: WebSocketService
  ) {
    this.webSocketService.setNameEvent("event")
    this.webSocketService.callback.subscribe(res => {
      console.log("Llegando notificación desde el backend->" + JSON.stringify(res))
      this.notifications.unshift(res)
      localStorage.setItem('notifications', JSON.stringify(this.notifications));
      console.log(JSON.stringify(this.notifications))
    })
    this.usuario = {
      email: "",
      nombre: "",

    }
    if (localStorage.getItem('variablesDeUsuarioLogadoDTO') === null) {
      this.router.navigate(["/login"])
    } else {
      let usuario: googleCredentials = JSON.parse(localStorage.getItem('variablesDeUsuarioLogadoDTO')!);
      console.log("Nuevo logueado " + JSON.stringify(usuario))
      this.usuario = new Usuario(usuario.name, usuario.email, '', usuario.picture);
    }

  }
  ngOnInit(): void {
   const savedNotifications = localStorage.getItem('notifications');
    this.notifications = savedNotifications ? JSON.parse(savedNotifications) : [];
  }
  redirect(item: any) {
    console.log("redireccionando " + JSON.stringify(item))
    if (item.subtaskExam.previous_subtask_exam_id == null) {
      this.router.navigate(["manage-execution-pipeline/exam/" + item.subtaskExam.exam.id + "/subtask/" + item.subtaskExam.sub_task.id])
    } else {
      this.router.navigate(["manage-execution-pipeline/exam/" + item.subtaskExam.exam.id + "/subtask/" + item.subtaskExam.sub_task.id + "/previous/" + item.subtaskExam.previous_subtask_exam_id])
    }

  }

  logout() {
    this.usuarioService.logout();
  }

  buscar(termino: string) {

    if (termino.length === 0) {
      return;
    }

    this.router.navigateByUrl(`/dashboard/buscar/${termino}`);
  }

}
