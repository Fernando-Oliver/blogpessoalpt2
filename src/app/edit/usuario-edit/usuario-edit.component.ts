
import { environment } from './../../../environments/environment.prod';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/Usuario';

@Component({
  selector: 'app-user-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.css']
})
export class UserEditComponent implements OnInit {

  usuario: Usuario = new Usuario()
  idUsuario: number
  confirmarSenha: string
  tipodeUsuario: string

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router
    
  ) { }

  ngOnInit() {
    window.scroll(0, 0)

    if (environment.token == '') {
      this.router.navigate(['/entrar'])
    }

    this.idUsuario = this.route.snapshot.params['id']
    this.findByIdUsuario(this.idUsuario)
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value
  }

  tipoUsuario(event: any) {
    this.tipodeUsuario = event.target.value
  }

  atualizar() {
    this.usuario.tipo= this.tipodeUsuario
    if(this.usuario.senha != this.confirmarSenha){
      alert("As senhas estão incorretas")
    }else{
      this.auth.cadastrar(this.usuario).subscribe((resp: Usuario) =>{
        this.usuario = resp;
        this.router.navigate(["/inicio"])
        alert("Usuário atualizado com sucesso, faça o login novamente!")
        environment.token =''
        environment.nome = ''
        environment.foto =''
        environment.id = 0

        this.router.navigate(['/entrar'])
      })
    }
  }
  

  findByIdUsuario(id: number) {
    this.auth.getByIdUsuario(id).subscribe((resp: Usuario) => {
      this.usuario = resp
    })
  }

}