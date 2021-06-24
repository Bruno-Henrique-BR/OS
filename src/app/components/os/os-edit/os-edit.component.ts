import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Os } from 'src/app/models/os';
import { Cliente } from 'src/app/models/cliente';
import { Tecnico } from 'src/app/models/tecnico';
import { OsService } from 'src/app/services/os.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { MessageService } from 'src/app/services/message.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-os-edit',
  templateUrl: './os-edit.component.html',
  styleUrls: ['./os-edit.component.css']
})
export class OsEditComponent implements OnInit {

  clientes: Cliente[] = []
  tecnicos: Tecnico[] = []

  nomeDoTecnico: string = ''
  nomeDoCliente: string = ''

  os: Os = {
    prioridade:  '',
    status:      '',
    titulo:      '',
    descricao:   '',
    tecnico:     '',
    cliente:     '',
    nomeCliente: '',
    nomeTecnico: '',
  }

  titulo:     FormControl = new FormControl(null, [Validators.required])
  descricao:  FormControl = new FormControl(null, [Validators.required])

  constructor(
    private clienteService: ClienteService,
    private tecnicoService: TecnicoService,
    private service:        OsService,
    private messageService: MessageService,
    private route:          ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.listarClientes();
    this.listarTecnicos();
    this.findById();
  }

  findById() {
    this.os.id = this.route.snapshot.paramMap.get('id');
    this.service.findById(this.os.id).subscribe(resposta => {
      this.os = resposta;
    }, err => {
      this.messageService.message(err.error.error);
    })
  }

  update() {
    this.service.update(this.os).subscribe(() => {
      this.messageService.message('Ordem atualizada com sucesso!');
    }, err => {
      this.messageService.message(err.error.error);
    })
  }

  listarClientes() {
    this.clienteService.findAll().subscribe(resposta => {
      this.clientes = resposta;
    }, err => {
      this.messageService.message(err.error.error);
    })
  }

  listarTecnicos() {
    this.tecnicoService.findAll().subscribe(resposta => {
      this.tecnicos = resposta;
    }, err => {
      this.messageService.message(err.error.error);
    })
  }

  validaCampos() {
    if (this.titulo.invalid  || this.descricao.invalid) {
      return false;
    }
    return true;
  }

  retornaStatus() {
    if(this.os.status == 0) 
      return 'ABERTO'

    if(this.os.status == 1) 
      return 'ANDAMENTO'

    return 'ENCERRADO'
  }

  retornaPrioridade() {
    if(this.os.prioridade == 0) 
      return 'BAIXA'
    
    if(this.os.prioridade == 1) 
      return 'MÉDIA'
    
    return 'ALTA'
  }

}
