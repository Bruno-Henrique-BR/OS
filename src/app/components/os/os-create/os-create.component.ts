import { FormControl, Validators } from '@angular/forms';
import { MessageService } from '../../../services/message.service';
import { TecnicoService } from '../../../services/tecnico.service';
import { ClienteService } from '../../../services/cliente.service';
import { OsService } from '../../../services/os.service';
import { Component, OnInit } from '@angular/core';
import { Os } from 'src/app/models/os';
import { Cliente } from 'src/app/models/cliente';
import { Tecnico } from 'src/app/models/tecnico';
import { Router } from '@angular/router';

@Component({
  selector: 'app-os-create',
  templateUrl: './os-create.component.html',
  styleUrls: ['./os-create.component.css']
})
export class OsCreateComponent implements OnInit {

  clientes: Cliente[] = []
  tecnicos: Tecnico[] = []

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

  prioridade: FormControl = new FormControl(null, [Validators.required])
  status:     FormControl = new FormControl(null, [Validators.required])
  titulo:     FormControl = new FormControl(null, [Validators.required])
  descricao:  FormControl = new FormControl(null, [Validators.required])
  tecnico:    FormControl = new FormControl(null, [Validators.required])
  cliente:    FormControl = new FormControl(null, [Validators.required])

  constructor(
    private service:        OsService,
    private clienteService: ClienteService,
    private tecnicoService: TecnicoService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.listarClientes();
    this.listarTecnicos();
  }

  create() {
    this.service.create(this.os).subscribe(() => {
      this.messageService.message('Ordem registrada com sucesso!');
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
    if (this.titulo.invalid || this.prioridade.invalid || this.status.invalid || this.tecnico.invalid
      || this.cliente.invalid || this.descricao.invalid) {
      return false;
    }
    return true;
  }

}
